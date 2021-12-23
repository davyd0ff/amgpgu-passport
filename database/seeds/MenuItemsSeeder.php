<?php
  
  use App\Builders\Menu\MenuItemIndexes;
  use App\Capabilities;
  use App\Models\Entities\Capability;
  use App\Models\Entities\MenuItem;
  use Illuminate\Database\Seeder;
  
  class MenuItemsSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
      //
      $this->insertStudentMenu();
      $this->insertAdminMenu();
    }
    
    protected function insertStudentMenu() {
      $menu_item_student_index = MenuItem::firstOrCreate(
        ['title' => MenuItemIndexes::STUDENT_INDEX]
      );
      $menu_item_student_index->save();
      
      
      $menu_item_student_education = MenuItem::firstOrCreate(
        ['title' => 'MENU_ITEM_STUDENT_EDUCATION']
      );
      $menu_item_student_education->parent()->associate($menu_item_student_index);
      $menu_item_student_education->save();
      
      
      $menu_item_student_practice = MenuItem::firstOrCreate(
        ['title' => 'MENU_ITEM_STUDENT_PRACTICE'],
        ['url' => '/student/practice']
      );
      $menu_item_student_practice->parent()->associate($menu_item_student_education);
      $menu_item_student_practice->save();
      
      
      $menu_item_student_course_works = MenuItem::firstOrCreate(
        ['title' => 'MENU_ITEM_STUDENT_COURSE_WORKS'],
        ['url' => '/student/course-works']
      );
      $menu_item_student_course_works->parent()->associate($menu_item_student_education);
      $menu_item_student_course_works->save();
      
      
      $menu_item_student_qualifying_works = MenuItem::firstOrCreate(
        ['title' => 'MENU_ITEM_STUDENT_QUALIFY_WORKS'],
        ['url' => '/student/qualifying-works']
      );
      $menu_item_student_qualifying_works->parent()->associate($menu_item_student_education);
      $menu_item_student_qualifying_works->save();
      
      
      $menu_item_student_my_achievement = MenuItem::firstOrCreate(
        ['title' => 'MENU_ITEM_STUDENT_MY_ACHIEVEMENT']
      );
      $menu_item_student_my_achievement->parent()->associate($menu_item_student_index);
      $menu_item_student_my_achievement->save();
      
      
      $menu_item_student_professional_achievement = MenuItem::firstOrCreate(
        ['title' => 'MENU_ITEM_STUDENT_PROFESSIONAL_ACHIEVEMENT'],
        ['url' => '/student/professional-achievement']
      );
      $menu_item_student_professional_achievement->parent()->associate($menu_item_student_my_achievement);
      $menu_item_student_professional_achievement->save();
      
      
      $menu_item_student_public_life = MenuItem::firstOrCreate(
        ['title' => 'MENU_ITEM_STUDENT_PUBLIC_LIFE'],
        ['url' => '/student/public-life']
      );
      $menu_item_student_public_life->parent()->associate($menu_item_student_my_achievement);
      $menu_item_student_public_life->save();
      
      
      $menu_item_student_university_life = MenuItem::firstOrCreate(
        ['title' => 'MENU_ITEM_STUDENT_UNIVERSITY_LIFE'],
        ['url' => '/student/university-life']
      );
      $menu_item_student_university_life->parent()->associate($menu_item_student_my_achievement);
      $menu_item_student_university_life->save();
      
      
      $menu_item_student_my_publications = MenuItem::firstOrCreate(
        ['title' => 'MENU_ITEM_STUDENT_MY_PUBLICATIONS'],
        ['url' => '/student/my-publications']
      );
      $menu_item_student_my_publications->parent()->associate($menu_item_student_my_achievement);
      $menu_item_student_my_publications->save();
      
      
      $menu_item_student_certificates = MenuItem::firstOrCreate(
        ['title' => 'MENU_ITEM_STUDENT_CERTIFICATES'],
        ['url' => '/student/my-certificates']
      );
      $menu_item_student_certificates->parent()->associate($menu_item_student_my_achievement);
      $menu_item_student_certificates->save();
      
      
      $menu_item_student_additional_education = MenuItem::firstOrCreate(
        ['title' => 'MENU_ITEM_STUDENT_ADDITIONAL_EDUCATION'],
        ['url' => '/student/additional-education']
      );
      $menu_item_student_additional_education->parent()->associate($menu_item_student_my_achievement);
      $menu_item_student_additional_education->save();
    }
    
    protected function insertAdminMenu() {
      // Administration
      $menu_item_administration = MenuItem::firstOrCreate(
        ['title' => MenuItemIndexes::ADMINISTRATION_INDEX]
      );
      $menu_item_administration->save();
      
      // Administration/Notifications
      $menu_item_notifications = MenuItem::firstOrCreate(
        ['title' => 'MENU_ITEM_ADMINISTRATION_NOTIFICATIONS']
      );
      $menu_item_notifications->parent()->associate($menu_item_administration);
      $menu_item_notifications->save();
      
      // Administration/Notifications/AddNotificationForStudents
      $menu_item_add_notification_for_students = MenuItem::firstOrCreate(
        ['title' => 'MENU_ITEM_ADMINISTRATION_ADD_NOTIFICATION_FOR_STUDENTS'],
        ['url' => '/notifications/add-for-students']
      );
      $menu_item_add_notification_for_students->parent()->associate($menu_item_notifications);
      $menu_item_add_notification_for_students->capabilities()->sync(
        Capability::where('name', Capabilities::CAN_ADD_NOTIFICATION_FOR_STUDENTS)
          ->get()
          ->map(function ($capability) {
            return $capability->id;
          })
      );
      $menu_item_add_notification_for_students->save();
    }
  }
