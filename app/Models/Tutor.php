<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Tutor extends Model
{
    protected $fillable = ['user_id', 'bio', 'rating_avg', 'total_reviews'];

    // Relasi balik ke User (untuk mengambil nama dan avatar)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke tabel TutorCourse (untuk mengambil harga dan mapel)
    public function courses()
    {
        return $this->hasMany(TutorCourse::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function availabilitySlots()
    {
        return $this->hasMany(AvailabilitySlot::class);
    }
}
