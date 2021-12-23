<?php
  
  
  namespace App\Builders\Menu;
  
  use App\Models\Entities\Menu;
  use App\Models\Entities\MenuItem;
  use App\Models\Entities\MenuPart;
  use App\Services\University\IUniversityService;
  use App\User;
  use Illuminate\Support\Collection;
  
  
  // todo develop: Подумай... что будешь возвращать ... модельки Entities, модельки DTO или сразу JSON?
  //               как будешь генерить модельки DTO ?
  
  class MenuBuilder implements IMenuBuilder {
    protected $menu;
    private $service;
    private $rootMenuItems;
//    private $rootStudentMenuItem;
//    private $rootListenerMenuItem;
    
    public function __construct(IUniversityService $service, RootMenuItems $rootMenuItems) {
      $this->menu = new Menu();
      $this->service = $service;
      $this->rootMenuItems = $rootMenuItems;
//      $this->rootStudentMenuItem = $rootMenuItems->getStudentRootMenuItem();
//      $this->rootListenerMenuItem = $rootMenuItems->getListenerRootMenuItem();
    }
    
    public function getMenu(): Menu {
      return $this->menu;
    }
    
    public function BuildStudentMenuPart(User $user): IMenuBuilder {
      // todo develop: Необходимо продумать, как получать academicPlan ... мб можно с getStudentData
      // todo think: чем мне не нравится этот метод...
      //             Обращается к сервису, чтобы узнать является ли пользователь студентом - это наверное неправильно... про это должен знать сам пользователь
      //             Знает о том как называется рутовый элемент дерева студента... и знает это от глобальной переменной!
      //             Мало того... обращается к MenuItem::where !
      $rootStudentMenuItem = $this->rootMenuItems->getStudentRootMenuItem();
      
      $isStudent = $this->service->isStudent($user->getUserCode());
      if ($isStudent) {
        $student_menu = new Collection();
        if ($rootStudentMenuItem) {
          $student_menu->push($rootStudentMenuItem);
          $this->menu->addMenuPart(new MenuPart('student', $student_menu));
        }
      }
      
      return $this;
    }
    
    public function BuildListenerMenuPart(User $user): IMenuBuilder {
      $rootListenerMenuItem = $this->rootMenuItems->getListenerRootMenuItem();
      $is_listener = $this->service->isListener($user->getUserCode());
      
      if ($is_listener) {
        $listener_menu = new Collection();
        if ($rootListenerMenuItem) {
          $listener_menu->push($rootListenerMenuItem);
          $this->menu->addMenuPart(new MenuPart('listener', $listener_menu));
        }
      }
      
      return $this;
    }
    
    public function BuildAdministrationMenuPart(User $user): IMenuBuilder {
      // todo think: чем мне не нравится этот метод...
      //             получает пользователя, для того чтобы извлечь Capabilities
      //             получив Capabilities запрашивает у них MenuItem'ы (т.е. знает связь между Capability и MenuItem)
      //             после формирует дерево меню ... создавая несохраняемый экземпляр MenuItem с двумя только свойствами title и url
      //             и делает он это только для того, чтобы "правильно" вызвался serialize() у MenuItem'ов
      //
      //             С другой стороны ... этот код изолирован
      $user_capabilities = $user->getCapabilities();
      
      $admin_menu_items = $user_capabilities->map(function ($capability) {
        return $capability->getAllowedMenuItems();
      })->collapse()->unique();
      
      $tree = $admin_menu_items->reduce(function ($total, $current) {
        return $this->buildMenuTreeUpstream($current, $this->newMenuItemWithoutSaving($current, $current->items), $total ?? collect([]));
      });
      $tree = $tree ?? collect([]);
      
      $this->menu->addMenuPart(new MenuPart('admin', $tree));
      
      return $this;
    }
    
    protected function newMenuItemWithoutSaving(MenuItem $item, $items): MenuItem {
      // todo think: является ли это проблемным местом и нарушает ли это LoseCoupling?
      //             Builder знает о внутренней реализации MenuItem и о его "секретах"
      //
      $menuItem = new MenuItem();
      $menuItem->title = $item->title;
      $menuItem->url = $item->url;
      $menuItem->items = $items;
      
      return $menuItem;
    }
    
    protected function buildMenuTreeUpstream(MenuItem $item, MenuItem $parentItem, Collection $tree) {
      if (!isset($item->parent)) {
        $itemInTree = $tree->firstWhere('title', $item->title);
        if (!isset($itemInTree)) {
          $tree->push($parentItem);
        } else {
          $itemInTree->items->union($parentItem->items);
        }
        return $tree;
      }
      
      $parentItem = $this->newMenuItemWithoutSaving($item->parent, collect([]));
      $parentItem->items->push($item);
      
      return $this->buildMenuTreeUpstream($item->parent, $parentItem, $tree);
    }
  }