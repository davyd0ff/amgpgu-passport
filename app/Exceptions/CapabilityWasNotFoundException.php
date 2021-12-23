<?php
  
  
  namespace App\Exceptions;
  
  
  class CapabilityWasNotFoundException extends AmgpguPassportException {
    protected $messageCode = 'CAPABILITY_WAS_NOT_FOUND';
    protected $code = 404;
  }