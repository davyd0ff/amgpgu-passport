<?php
  
  
  namespace App\Builders\Menu;
  
  
  use App\Models\Entities\MenuItem;
  
  class RootMenuItems {
    public function getStudentRootMenuItem(): MenuItem {
      return MenuItem::where('title', MenuItems::STUDENT_INDEX)->first();
    }
    
    public function getListenerRootMenuItem(): MenuItem {
      return MenuItem::where('title', MenuItems::LISTENER_INDEX)->first();
    }
  
    public function getAdministratorRootMenuItem(): MenuItem {
      return MenuItem::where('title', MenuItems::ADMINISTRATION_INDEX)->first();
    }
  }