<?php
  
  namespace App;
  
  use App\Builders\Menu\IMenuBuilder;
  use App\Models\Entities\File;
  use App\Models\Entities\Menu;
  use App\Models\Entities\Notification;
  use App\Models\Entities\Role;
  use App\Models\Entities\Capability;
  use App\Passport\HasApiTokensWithRefreshToken;
  use App\Serializer\ISerializer;
  use Illuminate\Foundation\Auth\User as Authenticatable;
  use Illuminate\Notifications\Notifiable;
  use Illuminate\Support\Collection;
//  use Laravel\Passport\HasApiTokens;
  
  class User extends Authenticatable {
    use HasApiTokensWithRefreshToken, Notifiable;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
      'name', 'email', 'password', 'firstname', 'lastname', 'middlename', 'code'
    ];
    
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
      'email', 'password', 'firstname', 'lastname', 'middlename', 'code',
      'remember_token', 'name'
    ];
    
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
      'email_verified_at' => 'datetime',
    ];
    
    protected function roles() {
      return $this->belongsToMany(
        Role::class,
        'user_role',
        'user_id',
        'role_id'
      );
    }
    
    protected function files() {
      return $this->morphMany(File::class, 'owner');
    }
    
    protected function incoming_notifications() {
      return $this->belongsToMany(
        Notification::class,
        'incoming_notifications',
        'to_user_id',
        'notification_id'
      )->withPivot(['readed', 'readed_at']);
    }
    
    public function getFiles(string $context) {
      return $this->files()
        ->where('context', $context)
        ->get();
    }
    
    public function getIncomingNotifications(\Illuminate\Support\Carbon $year): Collection {
      return $this->incoming_notifications()
        ->where('created_at', '>', $year)
        ->orderBy('created_at', 'desc')
        ->get();
    }
    
    public function getUnreadIncomingNotifications(): Collection {
      return $this->incoming_notifications()
        ->where('readed', false)
        ->orderBy('created_at', 'desc')
        ->get();
    }
    
    public function readNotifications(array $ids): void {
      $fill_data = array_fill(0, count($ids), ['readed' => true, 'readed_at' => now()]);
      $updated_notifications = array_combine($ids, $fill_data);
      
      $this->incoming_notifications()->sync($updated_notifications, false);
    }
    
    
    public function getAvatar(): File {
      return $this->files()->where('context', 'avatar')->last();
      
      // todo develop: if $avatar is null then return base-image-avatar
    }
    
    public function getUserCode(): string {
      $code = $this->code;
      if($code) {
        return $code;
      }
      
      return "0";
    }
    
    public function getCapabilities(): Collection {
      return $this->roles->map(function ($role) {
        return $role->getCapabilities();
      })->collapse()->unique();
    }
    
    public function hasCapability(Capability $capability): bool {
      $capabilities = $this->getCapabilities();
      return $capabilities->contains('id', $capability->id);
    }
    
    // todo development: Must it be here?
    public function getMenu(IMenuBuilder $builder): Menu {
      return $builder->BuildStudentMenuPart($this)
        ->BuildListenerMenuPart($this)
        ->BuildAdministrationMenuPart($this)
        ->getMenu();
    }
    
    
    public function compareId(int $userId): bool {
      return $this->id === $userId;
    }
    
    public function compare(User $user): bool {
      return $user->compareId($this->id);
    }
    
    public function getSerializableData(): array {
      return array(
        'id' => $this->id,
        'firstname' => $this->firstname,
        'lastname' => $this->lastname,
        'middlename' => $this->middlename,
        'email' => $this->email,
        'name' => $this->name,
//        'avatar' => $this->getAvatar()->getSerializableData(),
      );
    }
    
    public function findForPassport($username) {
      return self::where('name', $username)->first(); // change column name whatever you use in credentials
    }
    
    public function serialize(ISerializer $serializer): string {
      return $serializer->serialize($this->getSerializableData());
    }
  }
