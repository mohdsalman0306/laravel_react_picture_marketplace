<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['total', 'user_id', 'picture_is'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function picture() {
        return $this->belongsTo(Picture::class);
    }
}
