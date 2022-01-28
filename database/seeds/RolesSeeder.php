<?php
  
  use App\User;
  use Illuminate\Database\Seeder;
  use App\Models\Entities\Role;
  use App\Models\Entities\Capability;
  
  class RolesSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
      $role = Role::firstOrCreate(['name' => 'admin'], ['priority' => 1, 'alias' => 'Администраторы']);
      
      $role->setUsers(collect([User::where('name', env('APP_ADMIN_NAME'))->first()]));
      $role->setCapabilities(Capability::all());
    }
  }
