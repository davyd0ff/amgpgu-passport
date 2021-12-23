<?php
  
  
  namespace App\Services\University;
  
  use App\Exceptions\ConnectToServiceIsFailureException;
  use App\Exceptions\ServiceIsNotAvailable;
  use Exception;
  use SoapClient;
  
  class SoapService {
    private $client;
    private $opts = array(
      // 'http' => array(
      //   'user_agent' => 'PHPSoapClient'
      // ),
      'ssl' => array(
        'ciphers' => 'RC4-SHA',
        'verify_peer' => false,
        'verify_peer_name' => false,
        // 'allow_self_signed' => true
      )
    );
    protected $login = '';
    protected $password = '';
    protected $isLoginRequired = false;
    
    
    public function __call($method, $arguments) {
      $params = count($arguments) > 0 ? $arguments[0] : null;
      if ($this->client) {
        $result = null;
        if ($params) {
          $result = $this->client->$method($params);
        } else {
          $result = $this->client->$method();
        }
        //Обработаем возвращаемый результат
        $jsResult = $result->return;
        if (stripos($jsResult, "#value")) {
          $jsResult = str_replace("#value", "value", $jsResult);
          return (json_decode($jsResult))->value;
        }
        return json_decode($jsResult);
      } else {
        throw new ServiceIsNotAvailable();
      }
    }
    
    public function __construct(string $url, string $login, string $password) {
      ini_set('soap.wsdl_cache_enabled', 0);
      ini_set('soap.wsdl_cache_ttl', 0);
      
      try {
        $this->client = new SoapClient($url, $this->getConfig($login, $password));
      } catch (Exception $exception) {
        throw new ConnectToServiceIsFailureException();
      }
    }
    
    private function getConfig(string $login, string $password) {
      $configuration = array(
        'soap_version' => SOAP_1_2, //версия SOAP
        'cache_wsdl' => WSDL_CACHE_NONE,
        'trace' => true,
        'encoding' => 'UTF-8',
        'verifypeer' => false,
        'verifyhost' => false,
        'exceptions' => true,
        'connection_timeout' => 180,
        'stream_context' => stream_context_create($this->opts)
      );
      
      if ($this->isLoginRequired) {
        $configuration['login'] = $login;
        $configuration['password'] = $password;
      }
      
      return $configuration;
    }
  }