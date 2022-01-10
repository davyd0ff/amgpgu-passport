<?php
  
  
  namespace App\Exceptions;
  
  
  class OperationDeniedException extends AmgpguPassportException {
    protected $messageCode = 'OPERATION_DENIED';
    protected $code = 403;
  }