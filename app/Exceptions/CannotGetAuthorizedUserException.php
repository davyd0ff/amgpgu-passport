<?php
  
  
  namespace App\Exceptions;
  
  
  class CannotGetAuthorizedUserException extends AmgpguPassportException {
    protected $messageCode = 'CANNOT_GET_AUTHORIZED_USER';
  }