<?php
  
  
  namespace App\Models\Entities;
  
  
  use App\User;
  use Illuminate\Support\Collection;
  use Illuminate\Database\Eloquent\Model;
  
  class Role extends Model {
    protected $table = 'roles';
    protected $fillable = ['name', 'alias', 'priority'];

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
    
    public function setUsers(Collection $users) {
      $this->users()->sync($users->map(function ($entity) {
        return $entity->id;
      }));
    }
    
    public function setCapabilities(Collection $capabilities) {
      $this->capabilities()->sync($capabilities->map(function ($entity) {
        return $entity->id;
      }));
    }
    
    public function getCapabilities() {
      return $this->capabilities;
    }
  }