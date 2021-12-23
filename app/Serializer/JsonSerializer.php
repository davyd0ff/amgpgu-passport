<?php
  
  
  namespace App\Serializer;
  
  
  class JsonSerializer implements ISerializer {
    public function serialize(array $data) {
      return json_encode($data);
    }
  }