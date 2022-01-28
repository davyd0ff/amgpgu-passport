<?php
  
  /** @var \Illuminate\Database\Eloquent\Factory $factory */
  
  use Faker\Generator as Faker;
  
  $factory->define(App\Models\Entities\File::class, function (Faker $faker) {
    return [
      'name' => $faker->name . '.jpeg',
      'path' => $faker->name . '.jpeg',
      'context' => $faker->name,
      'type' => 'image/jpg',
    ];
  });
