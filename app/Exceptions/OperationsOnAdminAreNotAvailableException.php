<?php
  
  
  namespace App\Exceptions;
  
  
  class OperationsOnAdminAreNotAvailableException extends AmgpguPassportException {
    protected $messageCode = 'OPERATIONS_ON_ADMIN_ARE_NOT_AVAILABLE';
    protected $code = 406;
  }