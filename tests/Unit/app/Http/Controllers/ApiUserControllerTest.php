<?php
  
  namespace Tests\Unit\app\Http\Controllers;
  
  use App\Builders\Menu\IMenuBuilder;
  use App\Capabilities;
  use App\Models\Entities\Capability;
  use App\Models\Entities\Menu;
  use App\Models\Entities\Role;
  use App\User;
  use CapabilitySeeder;
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
    
    public function test_getUserInfo_UserIsNotAuthenticated() {
      $response = $this
        ->withHeaders([
          'Accept' => 'application/json'
        ])
        ->get('/api/user');
      
      $response->assertUnauthorized();
    }
    
    
    public function test_add() {
      $this->artisan('db:seed', ['--class' => CapabilitySeeder::class]);
      $user = factory(User::class)->create();
      $role = factory(Role::class)->create();
      $role->setCapabilities(Capability::where('name', Capabilities::CAN_CREATE_USER)->get());
      $role->setUsers(collect([$user]));
      Passport::actingAs($user);
      
      $response = $this->withHeaders([
        'Accept' => 'application/json'
      ])->post('api/admin/users/add', [
        'name' => 'TEST',
        'email' => 'test@amgpgu.ru',
        'password' => 'tester#1',
        'code' => '123456789',
        'firstname' => 'Тест',
        'lastname' => 'Тестов',
        'middlename' => 'Тестович'
      ]);
      
      $response->assertStatus(201)
        ->assertJsonStructure(['id']);
    }
    
    public function test_add_AddedUserIsExist() {
      $this->artisan('db:seed', ['--class' => CapabilitySeeder::class]);
      $user = factory(User::class)->create();
      $role = factory(Role::class)->create();
      $role->setCapabilities(Capability::where('name', Capabilities::CAN_CREATE_USER)->get());
      $role->setUsers(collect([$user]));
      Passport::actingAs($user);
      $addedUser = User::firstOrCreate(['name' => 'TEST'], [
        'email' => 'test@amgpgu.ru',
        'password' => 'tester#1',
        'code' => '123456789',
        'firstname' => 'Тест',
        'lastname' => 'Тестов',
        'middlename' => 'Тестович'
      ]);
      
      $response = $this->withHeaders([
        'Accept' => 'application/json'
      ])->post('api/admin/users/add', [
        'name' => 'TEST',
        'email' => 'test@amgpgu.ru',
        'password' => 'tester#1',
        'code' => '123456789',
        'firstname' => 'Тест',
        'lastname' => 'Тестов',
        'middlename' => 'Тестович'
      ]);
      
      $response->assertStatus(201)
        ->assertJsonFragment(['id' => $addedUser->id]);
    }
    
    public function test_add_UserHasNoCapability() {
      Passport::actingAs(factory(User::class)->create());
      
      $response = $this->withHeaders([
        'Accept' => 'application/json'
      ])->post('api/admin/users/add', [
        'name' => 'TEST',
        'email' => 'test@amgpgu.ru',
        'password' => 'tester#1',
        'code' => '123456789',
        'firstname' => 'Тест',
        'lastname' => 'Тестов',
        'middlename' => 'Тестович'
      ]);
      
      $response->assertStatus(404)
        ->assertJsonFragment(['messageCode' => 'CAPABILITY_WAS_NOT_FOUND']);
    }
    
    public function test_add_UserIsNotAuthenticated() {
      $response = $this->withHeaders([
        'Accept' => 'application/json'
      ])->post('api/admin/users/add', [
        'name' => 'TEST',
        'email' => 'test@amgpgu.ru',
        'password' => 'tester#1',
        'code' => '123456789',
        'firstname' => 'Тест',
        'lastname' => 'Тестов',
        'middlename' => 'Тестович'
      ]);
      
      $response->assertStatus(401)
        ->assertJsonFragment(['messageCode' => 'USER_IS_NOT_AUTHENTICATED']);
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