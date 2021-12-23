<?php
  
  /** @var \Illuminate\Database\Eloquent\Factory $factory */
  
  use Faker\Generator as Faker;
  
  $factory->define(\App\Models\Entities\Notification::class, function (Faker $faker) {
    return [
      'title' => $faker->title,
      'message' => $faker->text,
      'from_user_id' => $faker->numberBetween(),
    ];
  });
