<?php

namespace App\Http\Controllers\Api\Learner;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Learner\ProfileService;
use App\Http\Resources\UserResource;

/**
 * @tags Learner - Profile
 */
class ProfileController extends Controller
{
    protected $profileService;

    public function __construct(ProfileService $profileService)
    {
        $this->profileService = $profileService;
    }

    public function me(Request $request)
    {
        // 1. Minta data ke Service
        $user = $this->profileService->getProfile($request->user()->id);

        // 2. Bungkus data menggunakan Resource
        return response()->json([
            'success' => true,
            'message' => 'Data user berhasil diambil',
            'data' => new UserResource($user)
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'nim' => 'nullable|string|max:50|unique:users,nim,' . $request->user()->id,
            'email' => 'nullable|email|unique:users,email,' . $request->user()->id,
            'phone' => 'nullable|string|max:20',
            // avatar dikosongkan dulu atau tambah image rule jika ada file upload
        ]);

        $user = $this->profileService->updateProfile($request->user()->id, $request->only(['name', 'nim', 'email', 'phone']));

        return response()->json([
            'success' => true,
            'message' => 'Profil berhasil diperbarui',
            'data' => new UserResource($user)
        ]);
    }
}
