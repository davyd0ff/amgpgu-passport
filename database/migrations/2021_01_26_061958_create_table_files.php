<?php
  
  use Illuminate\Database\Migrations\Migration;
  use Illuminate\Database\Schema\Blueprint;
  use Illuminate\Support\Facades\Schema;
  
  class CreateTableFiles extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
      Schema::create('files', function (Blueprint $table) {
        $table->id();
        $table->timestamps();
        $table->string('path');
        $table->string('name');
        $table->string('type');
        $table->string('context', 200);
        $table->integer('owner_id');
        $table->string('owner_type');
        $table->softDeletes();
      });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
      Schema::dropIfExists('files');
    }
  }
