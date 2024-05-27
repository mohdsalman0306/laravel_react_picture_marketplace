<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PictureController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\UserController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function() {
    Route::get('user', function (Request $request) {
        return [
            'user' => UserResource::make($request->user()),
            'currentToken' => $request->bearerToken()
        ];
    });
    Route::post('user/logout', [UserController::class, 'logout']);
    Route::post('store/picture', [PictureController::class, 'uploadFile']);
    Route::post('store/order', [OrderController::class, 'store']);
    Route::post('download/picture', [PictureController::class, 'downloadPicture']);
    Route::post('store/review', [ReviewController::class, 'store']);
    Route::post('update/review', [ReviewController::class, 'updateReview']);
    Route::post('delete/review', [ReviewController::class, 'deleteReview']);
});
Route::post('user/register', [UserController::class, 'store']);
Route::post('user/login', [UserController::class, 'auth']);
Route::get('categories/{hasPictures}', [CategoryController::class, 'index']);
Route::get('pictures', [PictureController::class, 'index']);
Route::get('pictures/{picture}', [PictureController::class, 'fetchById']);
Route::get('pictures/category/{category}', [PictureController::class, 'fetchByCategory']);
Route::post('find/pictures', [PictureController::class, 'fetchByTerm']);
Route::post('extensions', [PictureController::class, 'fetchExtensions']);
Route::get('pictures/extensions/{ext}', [PictureController::class, 'fetchByExt']);
