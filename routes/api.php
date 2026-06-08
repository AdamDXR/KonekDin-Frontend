<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Learner\TutorDiscoveryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Learner\ProfileController;
use App\Http\Controllers\Api\Learner\DashboardController;
use App\Http\Controllers\Api\Learner\BookingController;
use App\Http\Controllers\Api\Learner\NotificationController;



// ROUTE PUBLIK 
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

use App\Http\Controllers\Api\MasterDataController;

// ROUTE PRIVATE
Route::middleware('auth:api')->group(function () {
    
    // Fitur User Terautentikasi
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/logout', [AuthController::class, 'logout']); 
    
    // Master Data (Bisa diakses Learner & Tutor)
    Route::get('/courses', [MasterDataController::class, 'courses']);
    Route::get('/master-slots', [MasterDataController::class, 'masterSlots']);
    
    // KHUSUS ROLE: LEARNER
    Route::middleware('role:learner')->group(function () {
        Route::get('/tutors', [TutorDiscoveryController::class, 'index']); 
        Route::get('/tutors/{id}', [TutorDiscoveryController::class, 'show']);
        Route::get('/me', [ProfileController::class, 'me']);
        Route::patch('/me', [ProfileController::class, 'update']);
        Route::get('/dashboard', [DashboardController::class, 'index']);
        Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
        Route::get('/learner/bookings', [BookingController::class, 'index']); // Menu Detail Pesanan
        Route::post('/learner/bookings', [BookingController::class, 'store']); // Memesan sesi
        Route::get('/learner/bookings/{id}', [BookingController::class, 'show']); // Lihat 1 pesanan
        Route::patch('/learner/bookings/{id}/pay', [BookingController::class, 'pay']); // Bayar pesanan
        Route::patch('/learner/bookings/{id}/simulate-payment', [BookingController::class, 'simulatePaymentSuccess']); // Klik OK di pop-up VA
        Route::post('/learner/bookings/{id}/reviews', [BookingController::class, 'submitReview']); // Beri Ulasan
        Route::get('/schedules', [BookingController::class, 'schedules']);
        Route::get('/learner/history', [BookingController::class, 'history']);
        Route::get('/learner/notification', [NotificationController::class, 'index']);
        Route::patch('/learner/notification/{id}/read', [NotificationController::class, 'markAsRead']);

    });
    
});
