<?php
  
  use Illuminate\Database\Migrations\Migration;
  use Illuminate\Database\Schema\Blueprint;
  use Illuminate\Support\Facades\Schema;
  
  class CreateTableNotifications extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
      Schema::create('notifications', function (Blueprint $table) {
        $table->id();
        $table->timestamps();
        $table->foreignId('from_user_id')->constrained('users');
        $table->string('title', 250);
        $table->text('message');
      });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
      Schema::dropIfExists('notifications');
    }
  }
