<?php
  
  
  namespace App\Models\Entities;
  
  
  use App\Serializer\ISerializer;
  use Illuminate\Support\Collection;
  use PharIo\Manifest\AuthorCollectionIterator;
  
  
  class MenuPart {
    private $title;
    private $items;
    
    public function __construct(string $title, Collection $items) {
      $this->title = $title;
      $this->items = $items;
    }
    
    
    public function getSerializableData(): array {
      $data = array(
        $this->title => $this->items
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