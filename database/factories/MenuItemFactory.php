<?php
  
  /** @var \Illuminate\Database\Eloquent\Factory $factory */
  
  use App\Models\Entities\MenuItem;
  use Faker\Generator as Faker;
  
  $factory->define(MenuItem::class, function (Faker $faker) {
    return [
      'title' => $faker->title,
      'url' => $faker->url,
    ];
  });
