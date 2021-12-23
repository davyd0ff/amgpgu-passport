<?php
  
  namespace App\Models\Entities;
  
  use App\Serializer\ISerializer;
  use Illuminate\Database\Eloquent\Model;
  use Illuminate\Database\Eloquent\SoftDeletes;
  use Illuminate\Support\Facades\Storage;
  
  class File extends Model {
    use SoftDeletes;
    
    protected $table = 'files';
    protected $fillable = ['name', 'path', 'context', 'type'];
    
    public function owner() {
      return $this->morphTo();
    }
    
    public function getSerializableData(): array {
      return array(
        'id' => $this->id,
        'name' => $this->name,
        'type' => $this->type,
        'created' => $this->created_at->timestamp,
        'url' => secure_url(Storage::url($this->path)),
      );
    }
    
    public function serialize(ISerializer $serializer) {
      return $serializer->serialize($this->getSerializableData());
    }
  }