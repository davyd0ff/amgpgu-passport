<?php
  
  
  namespace App\Models\Entities;
  
  use App\Serializer\ISerializer;
  use Illuminate\Database\Eloquent\Model;
  
  
  class MenuItem extends Model {
    protected $table = 'menu_items';
    protected $fillable = ['title', 'url'];
    
    
    public function parent() {
      return $this->belongsTo(MenuItem::class, 'parent_id', 'id');
    }
    
    public function items() {
      return $this->hasMany(MenuItem::class, 'parent_id', 'id');
    }
    
    public function capabilities() {
      return $this->belongsToMany(
        Capability::class,
        'menu_item_capability',
        'menu_item_id',
        'capability_id'
      );
    }
    
    public function getSerializableData(): array {
      $data = array(
        'title' => $this->title,
        'url' => $this->url,
        'items' => $this->items
          ->map(function (MenuItem $item) {
            return $item->getSerializableData();
          })
          ->all(),
      );
      
      return $data;
    }
    
    public function serialize(ISerializer $serializer) {
      return $serializer->serialize($this->getSerializableData());
    }
  }