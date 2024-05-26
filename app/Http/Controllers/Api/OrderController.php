<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Store new order
     */

    public function store(Request $request)  {

        $data = [];
        $user = User::findOrFail($request->user_id);

        foreach ($request->pictures as $picture) {
            $data['user_id'] = $user->id;
            $data['picture_id'] = $picture->id;
            $data['total'] = $this->calculateOrderTotal($request->pictures);

            //save the data
            $order = Order::create($data);

            //return the response
            return response()->json([
                'user' => UserResource::make($user)
            ]);
        }
    }

    /**
     * Calculate total amount
     */

    public function calculateOrderTotal($pictures) {
        $total = 0;
        foreach ($pictures as $picture) {
            $total += $picture['price'];
        }
        return $total * 100;
    }
}
