<?php
  
  
  namespace App\Builders\Menu;
  
  use App\Models\DTO\MenuDTO;
  use App\Models\Entities\MenuItem;
  use App\Services\PassportUniversitySoap;
  use App\User;
  use Illuminate\Support\Collection;
  use Illuminate\Support\Facades\Cache;
  
  // todo develop: Подумай... что будешь возвращать ... модельки Entities, модельки DTO или сразу JSON?
  //               как будешь генерить модельки DTO ?
  
  class MenuDTOBuilder implements Builder {
    protected $menu = null;
    
    public function __construct() {
      $this->menu = new Collection();
    }
    
    public function getMenu() {
      $this->menu = $this->menu->collapse();
      return $this->menu;
    }
    
    public function BuildStudentPartMenu(User $user) {
      $student_menu = [];

      $academicPlanData = []; // Получаю из IUniversityService
      
      if (count($academicPlanData) > 0 && $student_index_menu_item = MenuItem::where('title', MenuItemIndexes::STUDENT_INDEX)->first()) {
        $student_menu = [$this->buildMenuTreeDownstream($student_index_menu_item)];
      }
      
      $this->menu->push(['student' => $student_menu]);
      
      return $this;
    }
    
    public function BuildListenerPartMenu(User $user) {
      $listener_menu = [];
      //Cache::forget("$user->code-is-listener");
      $is_listener = Cache::remember("$user->code-is-listener", 10 * 24 * 60 * 60, function () use ($user) {
        try {
          $service = new PassportUniversitySoap();
          $response = $service->isListener(["usercode" => $user->code]);
          return $response;
        } catch (\Exception $exp) {
          return false;
        }
      });
      
      if ($is_listener && $listener_index_menu_item = MenuItem::where('title', MenuItemIndexes::LISTENER_INDEX)->first()) {
        $listener_menu = [$this->buildMenuTreeDownstream($listener_index_menu_item)];
      }
      
      $this->menu->push(['listener' => $listener_menu]);
      
      return $this;
    }
    
    public function BuildAdministrationPartMenu(User $user) {
      $user_capabilities = $user->roles->map(function ($role) {
        return $role->capabilities;
      })->collapse()->unique();
      
      $admin_menu_items = $user_capabilities->map(function ($capability) {
        return $capability->menu_items;
      })->collapse()->unique();
      
      $tree = $admin_menu_items->reduce(function ($total, $current) {
        return $this->buildMenuTreeUpstream($current, new MenuDTO($current), $total ?? collect([]));
      });
      
      $this->menu->push(['admin' => $tree]);
      
      return $this;
    }
    
    
    protected function buildMenuTreeDownstream(MenuItem $item) {
      $itemDTO = new MenuDTO($item);
      $itemDTO->items = $item->items->map(function ($subitem) {
        return $this->buildMenuTreeDownstream($subitem);
      });
      return $itemDTO;
    }
    
    protected function buildMenuTreeUpstream(MenuItem $item, MenuDTO $itemDTO, Collection $tree) {
      // todo test: This logic needs to test
      if (!isset($item->parent)) {
        $itemInTree = $tree->firstWhere('title', $item->title);
        if (!isset($itemInTree)) {
          $tree->push($itemDTO);
        } else {
          $itemInTree->items->union($itemDTO->items);
        }
        return $tree;
      }
      
      $parentItem = new MenuDTO($item->parent);
      $parentItem->items->push($itemDTO);
      return $this->buildMenuTreeUpstream($item->parent, $parentItem, $tree);
    }
  }