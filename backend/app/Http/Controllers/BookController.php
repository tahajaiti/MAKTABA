<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Book::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): Book
    {
        $data = $request->validate([
            'title' => 'required|string|max:255|min:3',
            'author' => 'required|string|max:255|min:3',
            'cover' => 'nullable|string',
            'quantity' => 'required|integer|min:1',
        ]);

        return Book::create($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Book::find($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
           'title' => 'string|max:255|min:3',
           'author' => 'string|max:255|min:3',
           'cover' => 'string|nullable',
           'quantity' => 'integer|min:1',
        ]);

        $book = Book::find($id);
        $book->update($request->all());
        return $book;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return Book::destroy($id);
    }
}
