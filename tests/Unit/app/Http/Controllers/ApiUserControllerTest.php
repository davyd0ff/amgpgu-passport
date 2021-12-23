<?php
  
  namespace Tests\Unit\app\Http\Controllers;
  
  use App\Builders\Menu\IMenuBuilder;
  use App\Models\Entities\Menu;
  use App\User;
  use DateTime;
  use DB;
  use Illuminate\Foundation\Testing\RefreshDatabase;
  use Illuminate\Support\Facades\Hash;
  use Laravel\Passport\ClientRepository;
  use Laravel\Passport\Passport;
  use Tests\TestCase;
  
  class ApiUserControllerTest extends TestCase {
    use RefreshDatabase;
    
    const TEST_USER_NAME = 'test';
    const TEST_USER_PASSWD = 'secret';
    const TEST_USER_CODE = 'test';
    const TYPE_ACCESS_TOKEN = 'Bearer ';
    
    private $user;
    private $userAccessToken;
    
    private function getUrl(string $uri): string {
      return 'https://passport.amgpgu.ru' . $uri;
    }
    
    protected function setUp(): void {
      parent::setUp();
      
      $clientRepository = new ClientRepository();
      $client = $clientRepository->createPersonalAccessClient(
        null, 'Test Personal Access Client', $this->getUrl('')
      );
      
      DB::table('oauth_personal_access_clients')->insert([
        'client_id' => $client->id,
        'created_at' => new DateTime,
        'updated_at' => new DateTime,
      ]);
      
      $this->user = User::create([
        'name' => self::TEST_USER_NAME,
        'email' => 'test@test.com',
        'password' => Hash::make(self::TEST_USER_PASSWD),
        'code' => self::TEST_USER_CODE,
      ]);
      
      $this->userAccessToken = $this->user->createToken('TestToken')->accessToken;
    }
    
    
    public function test_getUserInfo() {
      Passport::actingAs(factory(User::class)->create(['name' => self::TEST_USER_NAME]));
      
      $response = $this
        ->withHeaders([
          'Accept' => 'application/json'
        ])
        ->get('/api/user');
      
      $response->assertStatus(200)
        ->assertJsonPath('name', self::TEST_USER_NAME);
    }
    
    public function testGetUser_UserIsNotAuthenticated() {
      $response = $this
        ->withHeaders([
          'Accept' => 'application/json'
        ])
        ->get('/api/user');
      
      $response->assertUnauthorized();
    }
    
    
    public function test_getMenu() {
      $stubMenuBuilder = $this->getMenuBuilderStub();
      $this->app->instance(IMenuBuilder::class, $stubMenuBuilder);
      Passport::actingAs(factory(User::class)->create());
      
      
      $response = $this->get('/api/user/menu');
      
      
      $response->assertStatus(200)
        ->assertJsonPath('menu', 'mocked');
    }
    
    public function testGetMenu_UserIsNotAuthenticated() {
      $stubMenuBuilder = $this->getMenuBuilderStub();
      $this->app->instance(IMenuBuilder::class, $stubMenuBuilder);
      
      
      $response = $this
        ->withHeaders([
          'Accept' => 'application/json'
        ])
        ->get('/api/user/menu');
      
      
      $response->assertUnauthorized();
    }
    
    
    private function getMenuBuilderStub(): IMenuBuilder {
      $stubMenu = $this->getMenuStub();
      $stub = $this->createMock(IMenuBuilder::class);
      
      $stub->method('BuildStudentMenuPart')->willReturn($stub);
      $stub->method('BuildListenerMenuPart')->willReturn($stub);
      $stub->method('BuildAdministrationMenuPart')->willReturn($stub);
      $stub->method('getMenu')->willReturn($stubMenu);
      
      return $stub;
    }
    
    private function getMenuStub(): Menu {
      $stub = $this->createMock(Menu::class);
      
      $stub->method('getSerializableData')->willReturn(['menu' => 'mocked']);
      
      return $stub;
    }
  }