<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Fetch All Categories
     */

     public function index($hasPictures) {
        if ($hasPictures) {
            return CategoryResource::collection(Category::has('pictures')->get());
        } else {
            return CategoryResource::collection(Category::all());
        }
     }
}
