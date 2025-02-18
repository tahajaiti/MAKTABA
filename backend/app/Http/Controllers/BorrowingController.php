<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Borrowing;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Book;

class BorrowingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return ApiResponse::success([Borrowing::with('book', 'user')->get()]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Book $book): JsonResponse
    {
        if ($book->quantity < 1){
            return ApiResponse::error('Book is out of stock', 400);
        }

        $book->decrement('quantity');

        $borrowing = Borrowing::create([
            'user_id' => $request->user()->id,
            'book_id' => $book->id,
            'borrowed_at' => now(),
        ]);

        return ApiResponse::success($borrowing, 'Book borrowed successfully', 201);
    }

   public function returnBook(Borrowing $borrowing): JsonResponse
   {
       if ($borrowing->return_date) {
           return ApiResponse::error('Book is already returned', 400);
       }

       $borrowing->update(['return_date' => now()]);

       if ($borrowing->book){
           $borrowing->book->increment('quantity');
       }

       return ApiResponse::success($borrowing, 'Book returned successfully');
   }
}
