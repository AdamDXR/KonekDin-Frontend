<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TutorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'tutor_id' => $this->id,
            'name' => $this->user->name,
            'email' => $this->user->email,
            'phone' => $this->user->phone,
            'avatar' => $this->user->avatar,
            'bio' => $this->bio,
            'rating_avg' => $this->rating_avg,
            'total_reviews' => $this->total_reviews,
            'total_sessions' => $this->total_sessions ?? 0,
            'skills' => json_decode($this->skills, true) ?? [],
            'price' => (int) $this->price,
            
            'taught_courses' => $this->whenLoaded('courses', function () {
                return $this->courses->map(function ($tutorCourse) {
                    return [
                        'tutor_course_id' => $tutorCourse->id, 
                        'course_name' => $tutorCourse->course->name,
                        'course_code' => $tutorCourse->course->code,
                        'grade' => $tutorCourse->grade,
                    ];
                });
            }),
            
            'available_slots' => $this->whenLoaded('availabilitySlots', function () {
                return $this->availabilitySlots->map(function ($avail) {
                    return [
                        'availability_id' => $avail->id,
                        'day_of_week' => $avail->day_of_week,
                        'start_time' => date('H:i', strtotime($avail->slot->start_time ?? '')),
                        'end_time' => date('H:i', strtotime($avail->slot->end_time ?? '')),
                    ];
                });
            }),
        ];
    }
}
