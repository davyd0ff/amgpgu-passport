<?php
  
  use App\Capabilities;
  use App\Models\Entities\Capability;
  use Illuminate\Database\Seeder;
  
  class CapabilitySeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
      foreach (Capabilities::getCapabilities() as $key => $value) {
        Capability::firstOrCreate(
          ['name' => $value],
          ['alias' => $key]
        );
      }
    }
  }
