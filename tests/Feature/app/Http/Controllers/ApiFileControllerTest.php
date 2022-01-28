<?php
  
  namespace Tests\Feature\app\Http\Controllers;
  
  use App\Capabilities;
  use App\Models\Entities\Capability;
  use App\Models\Entities\File;
  use App\Models\Entities\Role;
  use App\User;
  use CapabilitySeeder;
  use Illuminate\Foundation\Testing\RefreshDatabase;
  use Illuminate\Http\UploadedFile;
  use Tests\TestCase;
  
  class ApiFileControllerTest extends TestCase {
    use RefreshDatabase;
    
    private $user;
    private $userTokens;
    private $context = 'test.context';
    
    public function setUp(): void {
      parent::setUp();
      
      $this->artisan('passport:client', [
        '--personal' => true,
        '--name' => config('app.name') . 'Personal Access'
      ]);
      
      $this->user = factory(User::class)->create();
      $this->userTokens = $this->user->createToken('TEST');
    }
    
    private function getAcceptJsonHeader() {
      return ['Accept' => 'application/json'];
    }
    
    private function getAuthorizationHeader($tokens) {
      return [
        'Authorization' => $tokens->tokenType . ' '
          . $tokens->accessToken
      ];
    }
    
    private function getHeaders() {
      return array_merge(
        $this->getAcceptJsonHeader(),
        $this->getAuthorizationHeader($this->userTokens)
      );
    }
    
    public function test_uploadFiles() {
      $file1 = UploadedFile::fake()->image('test1.file');
      $file2 = UploadedFile::fake()->image('test2.file');
      
      $response = $this->withHeaders($this->getHeaders())
        ->post('/api/files/upload/' . $this->context, [
          'files' => [$file1, $file2]
        ]);
      
      $response
        ->assertStatus(200)
        ->assertJsonStructure([
          '*' => [
            'id', 'name', 'url'
          ]
        ]);
    }
    
    public function test_fetchFiles() {
      factory(File::class)->create([
        'owner_id' => $this->user->id,
        'owner_type' => User::class,
        'context' => $this->context,
      ]);
      
      $response = $this->withHeaders($this->getHeaders())
        ->get('/api/files/fetch/' . $this->context);
      
      $response->assertStatus(200)
        ->assertJsonStructure([
          ['id', 'name', 'url']
        ]);
    }
    
    public function test_deleteFiles_userIsOwnerOfFile() {
      $file = factory(File::class)->create([
        'owner_id' => $this->user->id,
        'owner_type' => User::class,
        'context' => $this->context,
      ]);
      
      $response = $this->withHeaders($this->getHeaders())
        ->delete('/api/files/delete/' . $file->id);
      
      $response
        ->assertStatus(200)
        ->assertJsonStructure([
          'id'
        ]);
    }
    
    public function test_deleteFiles_userIsNotOwnerOfFile_ButHasCapability() {
      $otherUser = factory(User::class)->create();
      $tokens = $otherUser->createToken("TEST");
      $this->artisan('db:seed', ['--class' => CapabilitySeeder::class]);
      $role = Role::firstOrCreate(['name' => 'test'], ['alias' => 'test']);
      $role->setCapabilities(Capability::where('name', Capabilities::CAN_DELETE_STUDENT_FILES)->get());
      $role->setUsers(collect([$otherUser]));
      $file = factory(File::class)->create([
        'owner_id' => $this->user->id,
        'owner_type' => User::class,
        'context' => $this->context,
      ]);
      
      $response = $this
        ->withHeaders(array_merge(
          $this->getAcceptJsonHeader(),
          $this->getAuthorizationHeader($tokens)
        ))
        ->delete('/api/files/delete/' . $file->id);
      
      $response->assertStatus(200)
        ->assertJsonStructure(['id']);
    }
    
    public function test_deleteFiles_userIsNotOwnerOfFile() {
      $otherUser = factory(User::class)->create();
      $tokens = $otherUser->createToken("TEST");
      $file = factory(File::class)->create([
        'owner_id' => $this->user->id,
        'owner_type' => User::class,
        'context' => $this->context
      ]);
      
      $response = $this
        ->withHeaders(array_merge(
          $this->getAcceptJsonHeader(),
          $this->getAuthorizationHeader($tokens)
        ))
        ->delete('/api/files/delete/' . $file->id);
      
      $response->assertStatus(404)
        ->assertJsonFragment(['messageCode' => 'CAPABILITY_WAS_NOT_FOUND']);
    }
  }
  