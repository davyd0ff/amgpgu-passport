<?php
  
  
  namespace App\Exceptions;
  
  
  class OperationDeniedException extends AmgpguPassportException {
    protected $messageCode = 'TARGET_USER_HAS_HIGHER_PRIORITY';
    protected $code = 403;
  }