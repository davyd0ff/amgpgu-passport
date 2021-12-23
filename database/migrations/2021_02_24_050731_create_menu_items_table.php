<?php
  
  use Illuminate\Database\Migrations\Migration;
  use Illuminate\Database\Schema\Blueprint;
  use Illuminate\Support\Facades\Schema;
  
  class CreateMenuItemsTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
      Schema::create('menu_items', function (Blueprint $table) {
        $table->id();
        $table->timestamps();
        $table->string('title', 150)->unique();
        $table->string('url')->default('');
        $table->foreignId('parent_id')->nullable()->references('id')->on('menu_items')->cascadeOnDelete();
        $table->integer('order')->default(1);
      });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
      Schema::dropIfExists('menu_items');
    }
  }
