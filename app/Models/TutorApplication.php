<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TutorApplication extends Model
{
    use HasFactory;

    // Wajib ditambahkan karena nama tabel tidak berakhiran 's'
    protected $table = 'tutor_application';

    protected $fillable = [
        'user_id',
        'course_id',
        'grade',
        'transcript_file',
        'status',
        'admin_note',
        'approved_by',
        'approved_at',
    ];

    // Relasi ke User (Yang mendaftar)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke Course (Mata kuliah yang diajukan)
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    // Relasi ke Admin yang melakukan approve/reject
    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }
}
