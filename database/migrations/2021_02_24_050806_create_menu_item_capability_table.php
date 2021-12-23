<?php
  
  use Illuminate\Database\Migrations\Migration;
  use Illuminate\Database\Schema\Blueprint;
  use Illuminate\Support\Facades\Schema;
  
  class CreateMenuItemCapabilityTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
      Schema::create('menu_item_capability', function (Blueprint $table) {
        $table->id();
        $table->timestamps();
        $table->foreignId('menu_item_id')->references('id')->on('menu_items')->cascadeOnDelete();
        $table->foreignId('capability_id')->references('id')->on('capabilities')->cascadeOnDelete();
      });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
      Schema::dropIfExists('menu_item_capability');
    }
  }
