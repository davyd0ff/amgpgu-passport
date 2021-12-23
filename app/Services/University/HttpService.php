<?php

  namespace App\Services\University;

  use App\Exceptions\ConnectToServiceIsFailureException;
  use App\Exceptions\ServiceIsNotAvailable;
  use Exception;
  use HttpClient;

  class HttpService {
    private $client;
    private $login = '';
    private $passwd = '';
    private $url = '';
    
    public function __construct(string $url, string $login, string $passwd){
      $this->url = $url;
      $this->login = $login;
      $this->passwd = $passwd;
    }

    public function __call($method, $arguments){
      
    }
  }