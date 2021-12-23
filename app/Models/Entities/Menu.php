<?php
  
  
  namespace App\Models\Entities;
  
  
  use App\Serializer\ISerializer;
  use Illuminate\Support\Collection;
  
  class Menu {
    private $menu;
    
    public function __construct() {
      $this->menu = new Collection();
    }
    
    public function addMenuPart(MenuPart $menuPart): void {
      $this->menu->push($menuPart);
    }
    
    
    public function getSerializableData(): array {
      return $this->menu
        ->map(function (MenuPart $part) {
          return $part->getSerializableData();
        })
        ->collapse()
        ->all();
    }
    
    public function serialize(ISerializer $serializer): string {
      return $serializer->serialize($this->getSerializableData());
    }
  }