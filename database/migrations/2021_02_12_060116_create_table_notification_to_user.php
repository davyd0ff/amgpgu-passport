<?php
  
  use Illuminate\Database\Migrations\Migration;
  use Illuminate\Database\Schema\Blueprint;
  use Illuminate\Support\Facades\Schema;
  
  class CreateTableNotificationToUser extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
      Schema::create('incoming_notifications', function (Blueprint $table) {
        $table->id();
//        $table->timestamps();
        $table->foreignId('notification_id')->references('id')->on('notifications')->onDelete('cascade');
        $table->foreignId('to_user_id')->references('id')->on('users')->onDelete('cascade');
        $table->tinyInteger('readed')->default(false);
        $table->timestamp('readed_at')->nullable();
      });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
      Schema::dropIfExists('incoming_notifications');
    }
  }
