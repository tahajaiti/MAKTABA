<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Book>
 */
class BookFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(10),
            'author' => $this->faker->name(),
            'cover' => $this->faker->imageUrl(200, 300, 'books'),
            'quantity' => $this->faker->numberBetween(1, 100),
        ];
    }
}
