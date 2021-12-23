<?php
  
  
  namespace App\Models\Entities;
  
  
  use App\User;
  use Illuminate\Database\Eloquent\Collection;
  use Illuminate\Database\Eloquent\Model;
  
  class Role extends Model {
    protected $table = 'roles';
    protected $fillable = ['name', 'priority'];
    
//    public function construct(string $name, Collection $capabilities){
//      $this->name = $name;
//    }
    
    protected function users() {
      return $this->belongsToMany(
        User::class,
        'user_role',
        'role_id',
        'user_id'
      );
    }
    
    protected function capabilities() {
      return $this->belongsToMany(
        Capability::class,
        'role_capability',
        'role_id',
        'capability_id'
      )->withPivot(['denied', 'capability_id']);
    }
    
    
    public function getCapabilities() {
      return $this->capabilities;
    }
  }