<?php

namespace App\Swagger;

use OpenApi\Annotations as OA;


class BorrowingAnnotations
{
    /**
     * @OA\Get(
     *     path="/api/borrowings",
     *     summary="Get all borrowings",
     *     tags={"Borrowings"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="List of all borrowings",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/Borrowing")
     *         )
     *     )
     * )
     */
    public function index() {}

    /**
     * @OA\Post(
     *     path="/api/books/{book}/borrow",
     *     summary="Borrow a book",
     *     tags={"Borrowings"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="book",
     *         in="path",
     *         required=true,
     *         description="The ID of the book to borrow",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Book borrowed successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Borrowing")
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Book is out of stock",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Book is out of stock")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     )
     * )
     */
    public function store() {}

    /**
     * @OA\Patch(
     *     path="/api/borrowings/{borrowing}/return",
     *     summary="Return a borrowed book",
     *     tags={"Borrowings"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="borrowing",
     *         in="path",
     *         required=true,
     *         description="The ID of the borrowing record",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Book returned successfully",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Book returned successfully")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Book already returned",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Book already returned")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Borrowing record not found"
     *     )
     * )
     */
    public function returnBook() {}
}
