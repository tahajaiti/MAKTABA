<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Models\Book;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        return ApiResponse::success(Book::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'title' => 'required|string|max:255|min:3',
            'author' => 'required|string|max:255|min:3',
            'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'quantity' => 'required|integer|min:1',
        ]);

        $path = $request->hasFIle('cover') ? $request->file('cover')->store('covers', 'public') : null;

        $book = Book::create([
            'title' => $request->title,
            'author' => $request->author,
            'cover' => $path,
            'quantity' => $request->quantity,
        ]);

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
           'cover' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
           'quantity' => 'integer|min:1',
        ]);

        $book = Book::find($id);

        if (!$book) {
            return ApiResponse::error('Book does not exist', 404);
        }

        if ($request->hasFile('cover')){
            if ($book->cover){
                Storage::disk('public')->delete($book->cover);
            }

            $path = $request->file('cover')->store('covers', 'public');
            $book->cover = $path;
        }

        $book->update($request->except('cover'));

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
