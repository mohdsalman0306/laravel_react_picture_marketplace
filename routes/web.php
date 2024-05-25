<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CategoryController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AdminController::class, 'login'])->name('admin.login');
Route::post('auth', [AdminController::class,'auth'])->name('admin.auth');
Route::prefix('admin')->group(function() {
    Route::middleware('admin')->group(function() {
        Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.index');
        Route::post('logout', [AdminController::class,'logout'])->name('admin.logout');
    });

    Route::resource('categories', CategoryController::class, [
        'names' => [
            'index' => 'admin.categories.index',
            'create' => 'admin.categories.create',
            'show' => 'admin.categories.show',
            'store' => 'admin.categories.store',
            'edit' => 'admin.categories.edit',
            'update' => 'admin.categories.update',
            'destroy' => 'admin.categories.destroy',
        ]
    ]);
});
