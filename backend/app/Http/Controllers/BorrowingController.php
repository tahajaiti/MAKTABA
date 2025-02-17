<?php

namespace App\Http\Controllers;

use App\Models\Borrowing;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Book;

class BorrowingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Borrowing::with('book', 'user')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Book $book)
    {
        if ($book->quantity < 1){
            return response()->json([
                'message' => 'Book is out of stock'
            ], 400);
        }

        $book->decrement('quantity');

        return Borrowing::create([
            'user_id' => $request->user()->id,
            'book_id' => $book->id,
            'borrowed_at' => now(),
        ]);
    }

   public function returnBook(Borrowing $borrowing): JsonResponse
   {
       if ($borrowing->return_date) {
           return response()->json([
               'message' => 'Book already returned'
           ], 400);
       }

       $borrowing->update(['return_date' => now()]);

       if ($borrowing->book){
           $borrowing->book->increment('quantity');
       }

       return response()->json([
           'message' => 'Book returned successfully'
       ], 200);
   }
}
