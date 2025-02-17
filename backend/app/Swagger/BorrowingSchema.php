<?php

namespace App\Swagger;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Borrowing",
 *     type="object",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="user_id", type="integer", example=1),
 *     @OA\Property(property="book_id", type="integer", example=1),
 *     @OA\Property(property="borrowed_at", type="string", format="date-time", example="2024-02-17T15:00:00Z"),
 *     @OA\Property(property="return_date", type="string", format="date-time", nullable=true, example="2024-02-24T15:00:00Z"),
 *     @OA\Property(
 *         property="book",
 *         ref="#/components/schemas/Book"
 *     ),
 *     @OA\Property(
 *         property="user",
 *         type="object",
 *         @OA\Property(property="id", type="integer", example=1),
 *         @OA\Property(property="name", type="string", example="John Doe"),
 *         @OA\Property(property="email", type="string", format="email", example="john@example.com")
 *     )
 * )
 */
class BorrowingSchema
{

}
