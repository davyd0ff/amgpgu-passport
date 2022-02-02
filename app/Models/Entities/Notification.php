<?php
  
  namespace App\Models\Entities;
  
  use App\Serializer\ISerializer;
  use Illuminate\Database\Eloquent\Model;
  use App\User;
  
  class Notification extends Model {
    protected $table = 'notifications';
    
    protected $fillable = ['title', 'message', 'from_user_id'];
    
    
    protected function to() {
      return $this->belongsToMany(
        User::class,
        'incoming_notifications',
        'notification_id',
        'to_user_id'
      )->withPivot(['readed', 'readed_at']);
    }
    
    protected function from() {
      return $this->belongsTo(User::class, 'from_user_id', 'id');
    }
    
    protected function files() {
      return $this->morphMany(File::class, 'owner');
    }
    
    public function attachFiles($files) {
    }
    
    public function attachRecipients($recipients) {
      $this->to()->attach(
        $recipients->map(function ($recipient) {
          return $recipient->id;
        })
      );
    }
    
    public function getSerializableData(): array {
      return array(
        'id' => $this->id,
        'title' => $this->title,
        'message' => $this->message,
        'created' => $this->created_at->timestamp,
        'files' => $this->files->map(function (File $file) {
          return $file->getSerializableData();
        }),
        'isReaded' => (bool) $this->pivot->readed,
      );
    }
    
    public function serialize(ISerializer $serializer) {
      return $serializer->serialize($this->getSerializableData());
    }
  }
