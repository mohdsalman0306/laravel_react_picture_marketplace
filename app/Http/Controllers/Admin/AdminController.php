<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthAdminRequest;

class AdminController extends Controller
{
    /**
     * Render admin home page
     */
    public function index() {
        return view('admin.dashboard');
    }

    /**
     * Render Login Page
     */
    public function login() {
        if(!auth()->guard('admin')->check()) {
            return view('login');
        }
        return redirect()->route('admin.index');
    }

    /**
     * Authenticating the Admin
     */
    public function auth(AuthAdminRequest $request) {
        if ($request->validated()) {
            $remember_me = $request->has('remember_me') ? true : false;

            if (auth()->guard('admin')->attempt([
                'email' => $request->email,
                'password' => $request->password,
            ], $remember_me)) {
                return redirect()->route('admin.index');
            } else {
                return redirect()->route('admin.login')->with([
                    'error' => 'These credentials do not match any of our records.'
                ]);
            }
        }
    }

    /**
     * Admin Logout
     */
    public function logout() {
        auth()->guard('admin')->logout();
        return redirect()->route('admin.login');
    }
}
