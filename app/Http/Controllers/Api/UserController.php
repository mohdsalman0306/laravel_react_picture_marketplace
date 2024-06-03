<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Store New user
     */

    public function store(StoreUserRequest $request) {
        if($request->validated()) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            return response()->json([
                'user' => $user,
                'message' => 'The Account has been created successfully.'
            ]);
        } else {
            return response()->json([
                'error' => 'Something went wrong, please try again later.'
            ]);
        }
    }

    /**
     * Login User
     */
    public function auth(AuthUserRequest $request) {
        if ($request->validated()) {
            $user = User::whereEmail($request->email)->first();
            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'error' => 'Credentials do not match any of our records'
                ]);
            }
            $token = $user->createToken('new_user')->plainTextToken;
            //dd($token);
            return response()->json([
                'user' => $user,
                'access_token' => $token,
            ]);
        }
    }

    /**
     * logout user
     */

    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Logged out successfully.'
        ]);
    }
}
