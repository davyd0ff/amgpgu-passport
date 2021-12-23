<?php
  
  use Illuminate\Database\Migrations\Migration;
  use Illuminate\Database\Schema\Blueprint;
  use Illuminate\Support\Facades\Schema;
  
  class CreateTableCapabilityRole extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
      Schema::create('role_capability', function (Blueprint $table) {
        $table->id();
//            $table->timestamps();
        $table->foreignId('role_id')->references('id')->on('roles')->cascadeOnDelete();
        $table->foreignId('capability_id')->references('id')->on('capabilities')->cascadeOnDelete();
        $table->tinyInteger('denied')->default(false);
      });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
      Schema::dropIfExists('role_capability');
    }
  }
