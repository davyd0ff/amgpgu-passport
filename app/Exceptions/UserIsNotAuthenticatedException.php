<?php
  
  
  namespace App\Exceptions;
  
  
  class UserIsNotAuthenticatedException extends AmgpguPassportException {
    protected $messageCode = 'USER_IS_NOT_AUTHENTICATED';
    protected $code = 401;
  }