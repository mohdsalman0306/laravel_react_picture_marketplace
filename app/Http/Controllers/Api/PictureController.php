<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreImageRequest;
use App\Http\Resources\PictureResource;
use App\Http\Resources\UserResource;
use App\Models\Category;
use App\Models\Picture;
use App\Models\User;
use Illuminate\Http\Request;

class PictureController extends Controller
{
    /**
     * Fetch All Pictures
     */

    public function index() {
        return PictureResource::collection(Picture::whereStatus(1)->latest()->get());
    }

    /**
     * Fetch Picture by ID
     */
    public function fetchById(Picture $picture) {
        if (!$picture->status) {
            abort(404);
        }
        return PictureResource::make($picture);
    }

    /**
     * Fetch Picture by Category
     */
    public function fetchByCategory(Category $category) {
        return PictureResource::collection($category->pictures);
    }

    /**
     * Fetch Picture by Ext
     */
    public function fetchByExt($ext) {
        $pictures = Picture::where('ext', $ext)->latest()->get();
        return PictureResource::collection($pictures);
    }

    /**
     * Fetch Pictures by Title
     */
    public function fetchByTerm(Request $request) {
        $searchTerm = $request->searchTerm;
        $pictures = Picture::where('title', 'like', '%'.$searchTerm.'%')->latest()->get();
        return PictureResource::collection($pictures);
    }

    /**
     * Fetch all the extensions
     */
    public function fetchExtensions() {
        $extensions = Picture::select('ext')->distinct()->get();
        return response()->json($extensions);
    }

    /**
     * Upload File
     */

     public function uploadFile(StoreImageRequest $request) {
        //get logged in user
        $user = User::find($request->user_id);

        //save file
        $file = $request->file('file');
        $file_name = $this->saveImage($file);

        //save the data
        Picture::create([
            'title' => $request->title,
            'price' => $request->price,
            'user_id' => $user->id,
            'category_id' => $request->category_id,
            'file_path' => 'storage/user/images/'.$file_name,
            'ext' => $file->getClientOriginalExtension()
        ]);

        //return the response
        return response()->json([
            'message' => 'Picture has been successfully',
            'user' => UserResource::make($user)
        ]);
    }

    /**
      * Save the Picture in the storage
      */
    public function saveImage($file) {
        $file_name = time().'_'.'picture'.$file->getClientOriginalName();
        $file->storeAs('user/images', $file_name, 'public');
        return $file_name;
    }

    /**
     * Download picture from storage
     */

    public function downloadPicture(Picture $picture) {
        return response()->download($picture->file_path);
    }
}
