<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\BorrowingController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register'])->name('register');
    Route::post('login', [AuthController::class, 'login'])->name('login');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('logout', [AuthController::class, 'logout'])->name('logout');
        Route::get('profile', [AuthController::class, 'profile'])->name('profile');
    });

    Route::apiResource('books', BookController::class);

    Route::get('borrowings', [BorrowingController::class, 'index'])->name('borrowings.index');
    Route::post('borrow/{book}', [BorrowingController::class, 'store'])->name('borrowings.store');
    Route::patch('return/{borrowing}', [BorrowingController::class, 'returnBook'])->name('borrowings.return');
    Route::get('my-borrows', [BorrowingController::class, 'userBorrows'])->name('borrowings.user');
});;
