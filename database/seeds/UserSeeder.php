<?php
  
  use App\User;
  use Illuminate\Database\Seeder;
  
  class UserSeeder extends Seeder {
    public function run() {
      $admin = User::firstOrCreate([
        'name' => env('APP_ADMIN_NAME')
      ], [
        'password' => password_hash(env('APP_ADMIN_PASSWORD'), PASSWORD_DEFAULT),
        'email' => env('APP_ADMIN_EMAIL'),
        'firstname' => env('APP_ADMIN_FIRSTNAME', ''),
        'lastname' => env('APP_ADMIN_LASTNAME', ''),
        'middlename' => env('APP_ADMIN_MIDDLENAME', ''),
      ]);
    }
  }