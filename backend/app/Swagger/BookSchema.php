<?php

namespace App\Swagger;

use OpenApi\Annotations as OA;

/**
 * @OA\Schema(
 *     schema="Book",
 *     type="object",
 *     required={"title", "author", "quantity"},
 *     @OA\Property(property="id", type="string", example="1"),
 *     @OA\Property(property="title", type="string", example="The Great Book"),
 *     @OA\Property(property="author", type="string", example="John Doe"),
 *     @OA\Property(property="cover", type="string", example="http://example.com/cover.jpg"),
 *     @OA\Property(property="quantity", type="integer", example=10)
 * )
 */
class BookSchema
{

}
