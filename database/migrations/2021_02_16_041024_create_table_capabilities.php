<?php
  
  use Illuminate\Database\Migrations\Migration;
  use Illuminate\Database\Schema\Blueprint;
  use Illuminate\Support\Facades\Schema;
  
  class CreateTableCapabilities extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
      Schema::create('capabilities', function (Blueprint $table) {
        $table->id();
        $table->timestamps();
        $table->string('name', 100)->unique();
        $table->string('alias', 100);
      });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
      Schema::dropIfExists('capabilities');
    }
  }
