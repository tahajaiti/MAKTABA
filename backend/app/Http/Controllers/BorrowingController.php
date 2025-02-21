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

        $borrowings = Borrowing::with('book', 'user')->where('is_returned', '=', false)->get();

        return ApiResponse::success($borrowings);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Book $book): JsonResponse
    {
        if ($book->quantity < 1) {
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

    public function returnBook(Request $request, Book $book): JsonResponse
    {
        // if ($borrowing->return_date) {
        //     return ApiResponse::error('Book is already returned', 400);
        // }

        // $borrowing->update(['return_date' => now()]);

        // if ($borrowing->book) {
        //     $borrowing->book->increment('quantity');
        // }

        // return ApiResponse::success($borrowing, 'Book returned successfully');

        $borrowing = $book->borrowings()->whereUserId($request->user()->id)->whereIsReturned(false)->first();

        if (!$borrowing->exists()) {
            return ApiResponse::error('Book is not borrowed by you', 400);
        }

        if ($borrowing->book) {
            $borrowing->book->increment('quantity');
        }

        $borrowing->is_returned = true;
        $borrowing->return_date = now();
        $borrowing->save();

        return ApiResponse::success($borrowing, 'Book returned successfully');
    }

    public function userBorrows(Request $request): JsonResponse
    {
        return ApiResponse::success($request->user()->borrowings()->with('book')->get());
    }
}
