<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    protected $fillable = [
        'title',
        'author',
        'cover',
        'quantity',
    ];

    public function borrowings()
    {
        return $this->hasMany(Borrowing::class);
    }
}
