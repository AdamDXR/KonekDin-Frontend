<?php

namespace App\Services\Learner;

use App\Models\Booking;
use App\Models\BookingSlot;
use App\Models\MasterSlot;
use App\Models\Tutor;
use Illuminate\Support\Facades\DB;
use Exception;

class BookingService
{
    /**
     * Memesan sesi tutor (Bisa pilih banyak slot sekaligus)
     */
    public function createBooking($learnerId, $data)
    {
        $tutor = Tutor::findOrFail($data['tutor_id']);
        $slotIds = $data['slot_ids']; // Bentuknya array, contoh: [1, 2]
        
        // Harga total = Harga Tutor x Jumlah Slot yang dipilih
        $totalPrice = $tutor->price * count($slotIds);
        $serviceFee = 15000;
        $grandTotal = $totalPrice + $serviceFee;

        // Pakai DB Transaction agar jika gagal di tengah jalan, data di-rollback
        DB::beginTransaction();
        try {
            // 1. Buat Struk Transaksi (Tabel bookings)
            $booking = Booking::create([
                'tutor_id' => $tutor->id,
                'course_id' => $data['course_id'],
                'learner_id' => $learnerId,
                'booking_date' => $data['booking_date'],
                'total_price' => $totalPrice,
                'service_fee' => $serviceFee,
                'grand_total' => $grandTotal,
                'status' => 'pending',
                'payment_status' => 'unpaid'
            ]);

            // 2. Masukkan Rincian Slot dan Cek Jadwal Bentrok
            foreach ($slotIds as $slotId) {
                // Cek apakah slot ini di hari itu sudah dipesan orang lain (dan belum di-cancel)
                $isBooked = BookingSlot::whereHas('booking', function ($q) use ($tutor, $data) {
                    $q->where('tutor_id', $tutor->id)
                      ->where('booking_date', $data['booking_date'])
                      ->whereIn('status', ['pending', 'accepted']);
                })->where('slot_id', $slotId)->exists();

                if ($isBooked) {
                    throw new Exception("Gagal. Salah satu slot yang Anda pilih baru saja dipesan orang lain.");
                }

                // Ambil data jam dari MasterSlot
                $masterSlot = MasterSlot::findOrFail($slotId);

                // Masukkan ke keranjang BookingSlot
                BookingSlot::create([
                    'booking_id' => $booking->id,
                    'slot_id' => $slotId,
                    'start_time' => $masterSlot->start_time,
                    'end_time' => $masterSlot->end_time,
                ]);
            }

            DB::commit();
            return $booking->load('bookingSlots');
        } catch (Exception $e) {
            DB::rollBack();
            throw $e; // Lempar error ke Controller
        }
    }

    /**
     * Mengambil Semua Pesanan Aktif (Untuk Menu: Detail Pesanan)
     * Menampilkan yang belum dibayar & yang sudah dibayar tapi belum selesai
     */
    public function getActiveOrders($learnerId)
    {
        return Booking::with(['tutor.user', 'course', 'bookingSlots.slot'])
            ->where('learner_id', $learnerId)
            ->whereIn('status', ['pending', 'accepted'])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    /**
     * Mengambil Jadwal Mendatang (Untuk Menu: Jadwal Belajar)
     * Hanya menampilkan yang sudah LUNAS dan DI-ACC Tutor
     */
    public function getUpcomingSchedules($learnerId)
    {
        return Booking::with(['tutor.user', 'course', 'bookingSlots.slot'])
            ->where('learner_id', $learnerId)
            ->where('status', 'accepted')
            ->where('payment_status', 'paid')
            ->where('booking_date', '>=', now()->toDateString())
            ->orderBy('booking_date', 'asc')
            ->get();
    }

    /**
     * Mengambil Riwayat Masa Lalu (History)
     */
    public function getHistory($learnerId)
    {
        return Booking::with(['tutor.user', 'course', 'bookingSlots.slot', 'review'])
            ->where('learner_id', $learnerId)
            ->whereIn('status', ['completed', 'cancelled', 'rejected'])
            ->orderBy('booking_date', 'desc')
            ->get();
    }

    /**
     * Mengambil Detail Pesanan Spesifik (Untuk halaman Detail Pesanan)
     */
    public function getBookingDetail($learnerId, $bookingId)
    {
        return Booking::with(['tutor.user', 'course', 'bookingSlots.slot', 'review'])
            ->where('learner_id', $learnerId)
            ->where('id', $bookingId)
            ->firstOrFail();
    }

    /**
     * Memproses Pembayaran (Simulasi MVP)
     */
    public function payBooking($learnerId, $bookingId, $paymentMethod)
    {
        $booking = Booking::where('learner_id', $learnerId)
            ->where('id', $bookingId)
            ->where('payment_status', 'unpaid')
            ->firstOrFail();

        // Generate Nomor VA palsu (Contoh: 8878 + Nomor HP acak / Timestamp)
        $paymentCode = '8878' . rand(10000000, 99999999);

        $booking->update([
            'payment_method' => $paymentMethod,
            'payment_code' => $paymentCode
            // Catatan: status pembayaran masih 'unpaid' sampai user transfer beneran
        ]);

        return $booking;
    }

    /**
     * Simulasi Pembayaran Sukses (Ketika klik OK di Pop-Up VA)
     */
    public function simulatePaymentSuccess($learnerId, $bookingId)
    {
        $booking = Booking::where('learner_id', $learnerId)
            ->where('id', $bookingId)
            ->firstOrFail();

        $booking->update([
            'payment_status' => 'paid'
        ]);

        return $booking;
    }

    /**
     * Submit Ulasan (Review) untuk sebuah pesanan
     */
    public function submitReview($learnerId, $bookingId, $data)
    {
        $booking = Booking::with('tutor')->where('learner_id', $learnerId)
            ->where('id', $bookingId)
            ->where('status', 'completed')
            ->firstOrFail();

        // Cek jika sudah pernah review
        if ($booking->review()->exists()) {
            throw new Exception("Anda sudah memberikan ulasan untuk sesi ini.");
        }

        DB::beginTransaction();
        try {
            // 1. Simpan Ulasan
            $review = $booking->review()->create([
                'rating' => $data['rating'],
                'comment' => $data['comment'] ?? null
            ]);

            // 2. Update Rata-Rata Rating Tutor
            $tutor = $booking->tutor;
            
            // Hitung rata-rata baru (rumus standar matematika)
            $newTotalReviews = $tutor->total_reviews + 1;
            $newRatingAvg = (($tutor->rating_avg * $tutor->total_reviews) + $data['rating']) / $newTotalReviews;

            $tutor->update([
                'total_reviews' => $newTotalReviews,
                'rating_avg' => round($newRatingAvg, 1)
            ]);

            DB::commit();
            return $review;
        } catch (Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
