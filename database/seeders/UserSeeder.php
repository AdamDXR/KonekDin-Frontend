<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = \App\Models\User::firstOrCreate(
            ['email' => 'admin@mhs.dinus.ac.id'],
            [
                'name' => 'Admin User',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
            ]
        );
        $admin->assignRole('admin');

        $tutor = \App\Models\User::firstOrCreate(
            ['email' => '111tutor@mhs.dinus.ac.id'],
            [
                'name' => 'Tutor User',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
            ]
        );
        $tutor->assignRole('tutor');

        $learner = \App\Models\User::firstOrCreate(
            ['email' => '111learner@mhs.dinus.ac.id'],
            [
                'name' => 'Learner User',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
            ]
        );
        $learner->assignRole('learner');
    }
}
