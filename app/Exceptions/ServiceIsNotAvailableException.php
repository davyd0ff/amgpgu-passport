<?php
  
  
  namespace App\Exceptions;
  
  
  class ServiceIsNotAvailableException extends AmgpguPassportException {
    protected $messageCode = 'SERVICE_IS_NOT_AVAILABLE';
  }