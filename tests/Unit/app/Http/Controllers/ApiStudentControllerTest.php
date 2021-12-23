<?php
  
  namespace Tests\Unit\app\Http\Controllers;
  
  use App\Services\University\IUniversityService;
  use App\User;
  use Illuminate\Foundation\Testing\RefreshDatabase;
  use Laravel\Passport\Passport;
  use Tests\TestCase;
  
  class ApiStudentControllerTest extends TestCase {
    use RefreshDatabase;
    
    private const STUDENT_DATA = ['data' => 'test'];
    
    public function test_getData() {
      $this->app->instance(IUniversityService::class, $this->getUniversityServiceStub());
      Passport::actingAs(factory(User::class)->create());
      
      
      $response = $this->get('/api/user/student-data');
      
      
      $response->assertStatus(200)
        ->assertJsonPath('data', 'test');
    }
    
    
    private function getUniversityServiceStub(): IUniversityService {
      $stub = $this->createMock(IUniversityService::class);
      $stub->method('getStudentData')->willReturn(self::STUDENT_DATA);
      
      return $stub;
    }
  }