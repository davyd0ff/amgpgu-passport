<?php
  
  
  namespace Tests\Unit\app\Builders\Menu;
  
  use App\Builders\Menu\MenuBuilder;
  use App\Builders\Menu\RootMenuItems;
  use App\Models\Entities\Capability;
  use App\Models\Entities\MenuItem;
  use App\Serializer\ISerializer;
  use App\Services\University\IUniversityService;
  use App\User;
  use Illuminate\Support\Collection;

//  use PHPUnit\Framework\TestCase;
  use Tests\TestCase;
  use Illuminate\Foundation\Testing\RefreshDatabase;
  
  
  class MenuBuilderTest extends TestCase {
    use RefreshDatabase;
    
    public function testBuildStudentPartMenu() {
//      use RefreshDatabase;
      #region Arrange
      $stubService = $this->getServiceStub();
      $stubUser = $this->getUserStub(collect([]));
      $stubRootMenuItems = $this->getRootMenuItemsStub('getStudentRootMenuItem');
      $stubSerializer = $this->getJsonSerializerStub();
      #endregion
      
      #region Act
      $builder = new MenuBuilder($stubService, $stubRootMenuItems);
      $menu = $builder->BuildStudentMenuPart($stubUser)
        ->getMenu();
      #endregion
      
      #region Assert
      $studentPartMenuAsJsonString = $this->getMenuItemFixtureAsJsonString('student');
      $this->assertEquals($studentPartMenuAsJsonString, $menu->serialize($stubSerializer));
      #endregion
    }
    
    public function testBuildListenerPartMenu() {
      #region Arrange
      $stubService = $this->getServiceStub();
      $stubUser = $this->getUserStub(collect([]));
      $stubRootMenuItems = $this->getRootMenuItemsStub('getListenerRootMenuItem');
      $stubSerializer = $this->getJsonSerializerStub();
      #endregion
      
      #region Act
      $builder = new MenuBuilder($stubService, $stubRootMenuItems);
      $menu = $builder->BuildListenerMenuPart($stubUser)
        ->getMenu();
      #endregion
      
      
      #region Assert
      $listenerPartMenuAsJsonString = $this->getMenuItemFixtureAsJsonString('listener');
      $this->assertEquals($listenerPartMenuAsJsonString, $menu->serialize($stubSerializer));
      #endregion
    }

    public function testBuildAdministrationPartMenu_UserHasCapability_MenuIsBuiltFully() {
      #region Arrange
      $stubService = $this->getServiceStub();
      $menuItemFixture = $this->getMenuItemFixture();
      $stubCapability = $this->getCapabilitiesStub('test', $menuItemFixture);
      $stubRootMenuItems = $this->createMock(RootMenuItems::class);
      $stubUser = $this->getUserStub(collect([$stubCapability]));
      $stubSerializer = $this->getJsonSerializerStub();
      #endregion


      #region Act
      $builder = new MenuBuilder($stubService, $stubRootMenuItems);
      $menu = $builder->BuildAdministrationMenuPart($stubUser)
        ->getMenu();
      #endregion


      #region Assert
      $adminPartJson = $this->getMenuItemFixtureAsJsonString('admin');
      $this->assertEquals($adminPartJson, $menu->serialize($stubSerializer));
      #endregion
    }

    public function testBuildAdministrationPartMenu_UserHasCapability_MenuIsBuiltPartially() {
      #region Arrange
      $rootMenuItem = factory(MenuItem::class)
        ->create(['title' => 'rootMenuItem', 'url' => '']);
      $otherSubRootMenuItem = factory(MenuItem::class)
        ->create(['title' => 'otherSubRootMenuItem', 'url' => '', 'parent_id' => $rootMenuItem->id]);
      $subRootMenuItem = factory(MenuItem::class)
        ->create(['title' => 'subRootMenuItem', 'url' => 'subRootMenuItem_url', 'parent_id' => $rootMenuItem->id]);
      $subSubRootMenuItem = factory(MenuItem::class)
        ->create(['title' => "subSubRootMenuItem", 'url' => "subSubRootMenuItem_url", 'parent_id' => $subRootMenuItem->id]);

      $stubService = $this->getServiceStub();
      $stubCapability = $this->getCapabilitiesStub('test', $subRootMenuItem);
      $stubRootMenuItems = $this->createMock(RootMenuItems::class);
      $stubUser = $this->getUserStub(collect([$stubCapability]));
      $stubSerializer = $this->getJsonSerializerStub();

      #endregion


      #region Act
      $builder = new MenuBuilder($stubService, $stubRootMenuItems);
      $menu = $builder->BuildAdministrationMenuPart($stubUser)
        ->getMenu();
      #endregion


      #region Assert
      $adminPartJson = json_encode(json_decode('{
        "admin": [
          {
            "title" : "rootMenuItem",
            "url" : "",
            "items" : [
              {
                "title" : "subRootMenuItem",
                "url" : "subRootMenuItem_url",
                "items" : [
                  {
                    "title" : "subSubRootMenuItem",
                    "url" : "subSubRootMenuItem_url",
                    "items" : []
                  }
                ]
              }
            ]
          }
        ]
      }'));
      $this->assertEquals($adminPartJson, $menu->serialize($stubSerializer));
      #endregion
    }
    
    public function testBuildAdministrationPartMenu_UserHasNoCapability() {
      #region Arrange
      $stubService = $this->getServiceStub();
      $stubRootMenuItems = $this->createMock(RootMenuItems::class);
      $stubUser = $this->getUserStub(collect([]));
      $stubSerializer = $this->getJsonSerializerStub();
      #endregion
      
      
      #region Act
      $builder = new MenuBuilder($stubService, $stubRootMenuItems);
      $menu = $builder->BuildAdministrationMenuPart($stubUser)
        ->getMenu();
      #endregion
      
      
      #region Assert
      $this->assertEquals('{"admin":[]}', $menu->serialize($stubSerializer));
      #endregion
    }
    
    #region Stubs
    private function getRootMenuItemsStub($methodName): RootMenuItems {
      $stub = $this->createMock(RootMenuItems::class);
      $stub->method($methodName)
        ->willReturn($this->getMenuItemFixture());
      
      return $stub;
    }
    
    private function getServiceStub(): IUniversityService {
      $stub = $this->createMock(IUniversityService::class);
      $stub->method('isListener')->willReturn(true);
      $stub->method('isStudent')->willReturn(true);
      $stub->method('getStudentAcademicPlans')->will($this->returnCallback(
        function () {
          return $this->getAcademicPlansFixture();
        }
      ));
      
      return $stub;
    }
    
    private function getUserStub(Collection $capabilities): User {
      $stub = $this->createMock(User::class);
      $stub->method('getUserCode')->willReturn("SOME_STRING");
      $stub->method('getCapabilities')->willReturn($capabilities);
      
      return $stub;
    }
    
    private function getJsonSerializerStub(): ISerializer {
      $stub = $this->createMock(ISerializer::class);
      $stub->method('serialize')
        ->will($this->returnCallback(function ($array) {
          return json_encode($array);
        }));;
      
      return $stub;
    }
    
    private function getCapabilitiesStub(string $name, MenuItem $menuItem): Capability {
      $stub = $this->createMock(Capability::class);
      $stub->method('getAllowedMenuItems')->willReturn(collect([$menuItem]));
      $stub->method('__get')->with('name')->willReturn($name);
      
      return $stub;
    }
    #endregion
    
    
    #region Fixtures
    private function getAcademicPlansFixture(): array {
      return [
        "0000001",
        "0000002",
      ];
    }
    
    private function getMenuItemFixture(): MenuItem {
      // rootMenuItem
      // |--- otherSubRootMenuItem
      // |--- subRootMenuItem
      //      |--- subSubRootMenuItem
      $rootMenuItem = factory(MenuItem::class)
        ->create(['title' => 'rootMenuItem', 'url' => '']);
      $otherSubRootMenuItem = factory(MenuItem::class)
        ->create(['title' => 'otherSubRootMenuItem', 'url' => '', 'parent_id' => $rootMenuItem->id]);
      $subRootMenuItem = factory(MenuItem::class)
        ->create(['title' => 'subRootMenuItem', 'url' => 'subRootMenuItem_url', 'parent_id' => $rootMenuItem->id]);
      $subSubRootMenuItem = factory(MenuItem::class)
        ->create(['title' => "subSubRootMenuItem", 'url' => "subSubRootMenuItem_url", 'parent_id' => $subRootMenuItem->id]);
      
      return $rootMenuItem;
    }
    
    private function getMenuItemFixtureAsJsonString(string $partName): string {
      return json_encode(json_decode('{
        "' . $partName . '" : [
          {
            "title" : "rootMenuItem",
            "url" : "",
            "items" : [
              {
                "title" : "otherSubRootMenuItem",
                "url" : "",
                "items" : []
              },
              {
                "title" : "subRootMenuItem",
                "url" : "subRootMenuItem_url",
                "items" : [
                  {
                    "title" : "subSubRootMenuItem",
                    "url" : "subSubRootMenuItem_url",
                    "items" : []
                  }
                ]
              }
            ]
          }
        ]
      }'));
    }
    
    #endregion
  }