$booking = \App\Models\Booking::forceCreate([
    'learner_id' => 3,
    'tutor_id' => 1,
    'course_id' => 1,
    'booking_date' => \Carbon\Carbon::now()->subDays(2)->format('Y-m-d'),
    'total_price' => 50000,
    'service_fee' => 2500,
    'grand_total' => 52500,
    'status' => 'completed',
    'payment_status' => 'paid',
    'payment_method' => 'VA',
    'payment_code' => '888812345678',
]);

\App\Models\BookingSlot::forceCreate([
    'booking_id' => $booking->id,
    'slot_id' => 1,
    'start_time' => '09:00:00',
    'end_time' => '10:00:00',
]);

echo "Booking seeded successfully with ID: " . $booking->id . "\n";
