<?php
  
  namespace Tests\Unit\app\Http\Controllers;
  
  use App\Services\University\IUniversityService;
  use App\User;
  use CapabilitySeeder;
  use Illuminate\Foundation\Testing\RefreshDatabase;
  use Laravel\Passport\Passport;
  use Tests\TestCase;
  
  class ApiEmployeeControllerTest extends TestCase {
    use RefreshDatabase;
    
    private const USER_NAME = 'test';
    private const USER_PASSWORD = 'secret';
    private const STUDENTS_TREE = ["tree" => "MOCKED"];
    
    protected function setUp(): void {
      parent::setUp();
      
    }
    
    public function test_getStudentsTree() {
      $this->artisan('db:seed', ['--class' => CapabilitySeeder::class]);
      Passport::actingAs($this->getUserStub(true));
      $this->app->instance(IUniversityService::class, $this->getUniversityServiceStub());


      $response = $this->get('/api/students/tree');


      $response->assertStatus(200)
        ->assertJsonPath('tree', 'MOCKED');
    }

    public function test_getStudentsTree_UserHasNotCapability() {
      $this->artisan('db:seed', ['--class' => CapabilitySeeder::class]);
      Passport::actingAs($this->getUserStub(false));
      $this->app->instance(IUniversityService::class, $this->getUniversityServiceStub());


      $response = $this->get('/api/students/tree');


      $response->assertStatus(400)
        ->assertJsonPath('messageCode', 'USER_HAS_NOT_CAPABILITY')
        ->assertJsonPath('messageDetailed', 'CAN_GET_STUDENT_TREE');
    }

    public function test_getStudentsTree_CapabilityIsNotExist() {
      Passport::actingAs($this->getUserStub(true));
      $this->app->instance(IUniversityService::class, $this->getUniversityServiceStub());


      $response = $this->get('/api/students/tree');


      $response->assertStatus(404)
        ->assertJsonPath('messageCode', 'CAPABILITY_WAS_NOT_FOUND');
    }

    public function test_getStudentsTree_UserIsNotAuthorized() {
      $this->app->instance(IUniversityService::class, $this->getUniversityServiceStub());


      $response = $this->withHeaders(['Accept' => 'application/json'])->get('/api/students/tree');


      $response->assertUnauthorized();
    }


    private function getUniversityServiceStub(): IUniversityService {
      $stub = $this->createMock(IUniversityService::class);
      $stub->method('getStudentsTree')->willReturn((object) self::STUDENTS_TREE);

      return $stub;
    }

    private function getUserStub(bool $userHasCapability): User {
      $stub = $this->createMock(User::class);
      $stub->method('hasCapability')->willReturn($userHasCapability);

      return $stub;
    }
  }