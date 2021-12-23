<?php
  
  
  namespace App\Builders\Menu;
  
  use App\Models\Entities\Menu;
  use App\User;
  
  
  interface IMenuBuilder {
    function BuildStudentMenuPart(User $user): IMenuBuilder;
    
    function BuildListenerMenuPart(User $user): IMenuBuilder;
    
    function BuildAdministrationMenuPart(User $user): IMenuBuilder;
    
    function getMenu(): Menu;
  }