<?php
  
  namespace App;
  
  use ReflectionClass;
  
  class Capabilities {
    public const CAN_GET_STUDENT_TREE = 'students/get-student-tree';
    public const CAN_DELETE_STUDENT_FILES = 'files/delete-student-files';
    
    public const CAN_ADD_NOTIFICATION_FOR_STUDENTS = 'notifications/add-notification-for-students';
    public const CAN_ADD_NOTIFICATION_FOR_EMPLOYEES = 'notifications/add-notification-for-employees';
    public const CAN_ADD_NOTIFICATION_FOR_LISTENERS = 'notifications/add-notification-for-listeners';
    
    public const CAN_CREATE_USER = 'users/add-new-user';
    public const CAN_DELETE_USER = 'users/delete-user';
    public const CAN_UPDATE_USER = 'users/update-user';
    public const CAN_SUSPEND_USER = 'users/suspend-user';
    
    static function getCapabilities() {
      $oClass = new ReflectionClass(Capabilities::class);
      return $oClass->getConstants();
    }
  }