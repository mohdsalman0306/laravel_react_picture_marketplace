<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Store new review
     */

    public function store(Request $request) {
        $review = Review::where([
            'picture_id' => $request->picture_id,
            'user_id' => $request->user_id
        ])->first();

        $order = Order::where([
            'picture_id' => $request->picture_id,
            'user_id' => $request->user_id
        ])->first();

        if ($review) {
            return response()->json([
                'error' => 'You have already reviewed this picture.'
            ]);
        } elseif (!$order) {
            return response()->json([
                'error' => 'You can review only the pictures that you bought.'
            ]);
        } else {
            $data = $request->all();
            Review::create($data);
            return response()->json([
                'message' => 'Your review has been added and will be published soon.'
            ]);
        }
    }
}
