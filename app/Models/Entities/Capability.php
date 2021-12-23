<?php
  
  
  namespace App\Models\Entities;
  
  
  use Illuminate\Database\Eloquent\Model;
  
  class Capability extends Model {
    protected $table = 'capabilities';
    protected $fillable = ['name', 'alias'];
    
    protected function menu_items() {
      return $this->belongsToMany(
        MenuItem::class,
        'menu_item_capability',
        'capability_id',
        'menu_item_id'
      );
    }
    
    public function getAllowedMenuItems() {
      return $this->menu_items;
    }
  }