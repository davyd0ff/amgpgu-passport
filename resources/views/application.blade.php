@extends('layouts.app')

@section('content')
  <div id="app">
    <app-component user="{{$user}}" token="{{$token}}"/>
  </div>
  <script src="{{ secure_asset('js/app.js') }}" defer></script>
@endsection
