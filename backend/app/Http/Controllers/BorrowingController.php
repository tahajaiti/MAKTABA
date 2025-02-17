<?php

namespace App\Http\Controllers;

use App\Models\Borrowing;
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
    public function store(Request $request)
    {
        $request->validate([
            'book_id' => 'required|string|exists:books,id',
        ]);

        $book = Book::findOrFail($request->book_id);

        if ($book->quantity < 1){
            return response()->json([
                'message' => 'Book is out of stock'
            ], 400);
        }

        $book->decrement('quantity');

        return Borrowing::create([
            'user_id' => $request->user()->id,
            'book_id' => $request->book_id,
            'borrowed_at' => now(),
        ]);
    }

   public function returnBook(Request $request, int $id)
   {
        $borrowing = Borrowing::findOrFail($id);

        if ($borrowing->returned_at) {
            return response()->json([
                'message' => 'Book already returned'
            ], 400);
        }

        $borrowing->update(['returned_at' => now()]);

        $book = Book::findOrFail($borrowing->book_id);

        $book->increment('quantity');

        return response()->json([
           'message' => 'Book returned successfully'
        ]);
   }
}
