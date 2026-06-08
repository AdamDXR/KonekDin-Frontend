<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MasterSlotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
        public function run(): void
    {
        $slots = [
            ['code' => 'Sesi-1', 'start_time' => '08:00:00', 'end_time' => '10:00:00'],
            ['code' => 'Sesi-2', 'start_time' => '10:00:00', 'end_time' => '12:00:00'],
            ['code' => 'Sesi-3', 'start_time' => '13:00:00', 'end_time' => '15:00:00'],
            ['code' => 'Sesi-4', 'start_time' => '15:30:00', 'end_time' => '17:30:00'],
            ['code' => 'Sesi-Malam', 'start_time' => '19:00:00', 'end_time' => '21:00:00'],
        ];

        foreach ($slots as $slot) {
            \App\Models\MasterSlot::firstOrCreate(['code' => $slot['code']], $slot);
        }
    }

}
