<?php
  
  
  namespace App\Models\DTO;
  
  
  use App\Models\Entities\MenuItem;
  use Illuminate\Support\Collection;
  
  class MenuDTO {
    public $items = [];
    public $title = '';
    public $url = '';
    
    public function __construct(MenuItem $menuItem) {
      $this->title = $menuItem->title;
      $this->url = $menuItem->url;
      $this->items = new Collection();
    }
  }