<?php
  
  use Illuminate\Database\Migrations\Migration;
  use Illuminate\Database\Schema\Blueprint;
  use Illuminate\Support\Facades\Schema;
  
  class CreateTableRoleUser extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
      Schema::create('user_role', function (Blueprint $table) {
        $table->id();
//        $table->timestamps();
        $table->foreignId('user_id')->references('id')->on('users')->cascadeOnDelete();
        $table->foreignId('role_id')->references('id')->on('roles')->cascadeOnDelete();
      });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
      Schema::dropIfExists('user_role');
    }
  }
