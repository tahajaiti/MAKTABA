<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Book;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return response()->json(Book::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255|min:3',
            'author' => 'required|string|max:255|min:3',
            'cover' => 'nullable|string',
            'quantity' => 'required|integer|min:1',
        ]);

        $book = Book::create($request->validated());

        return ApiResponse::success($book, 'Book created successfully', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $book = Book::find($id);

        if (!$book) {
            return ApiResponse::error('Book does not exist', 404);
        }

        return ApiResponse::success($book);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $request->validate([
           'title' => 'string|max:255|min:3',
           'author' => 'string|max:255|min:3',
           'cover' => 'string|nullable',
           'quantity' => 'integer|min:1',
        ]);

        $book = Book::find($id);

        if (!$book) {
            return ApiResponse::error('Book does not exist', 404);
        }

        $book->update($request->all());

        return ApiResponse::success($book, 'Book updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $book = Book::find($id);

        if (!$book) {
            return ApiResponse::error('Book does not exist', 404);
        }

        $book->delete();

        return ApiResponse::success(null, 'Book deleted successfully', 204);
    }
}
