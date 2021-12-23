<?php
  
  
  namespace App\Exceptions;
  
  
  class UserHasNotCapabilityException extends AmgpguPassportException {
    protected $messageCode = 'USER_HAS_NOT_CAPABILITY';
//    protected $code = 403;
  }