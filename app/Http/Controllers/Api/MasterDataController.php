<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\MasterSlot;

/**
 * @tags Master Data
 */
class MasterDataController extends Controller
{
    /**
     * Get all courses for 
     */
    public function courses()
    {
        $courses = Course::orderBy('name', 'asc')->get(['id', 'name', 'code']);
        
        return response()->json([
            'success' => true,
            'message' => 'Berhasil mengambil daftar mata kuliah',
            'data' => $courses
        ]);
    }

    /**
     * Get all master slots for dropdowns
     */
    public function masterSlots()
    {
        $slots = MasterSlot::orderBy('start_time', 'asc')->get(['id', 'code', 'start_time', 'end_time']);
        
        return response()->json([
            'success' => true,
            'message' => 'Berhasil mengambil daftar jam belajar',
            'data' => $slots
        ]);
    }
}
