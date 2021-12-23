@extends('layouts.app')

@section('include-styles')
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"/>
@endsection
@section('include-scripts')
  <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
@endsection

@section('content')
  <div class="container">
    <div class="row">
      <div class="center">
        <div class="card">
          <div class="card-title">{{ __('Login') }}</div>

          <div class="card-content">
            <form method="POST" action="{{ route('login') }}">
              @csrf

              <div class="row">
                <div class="input-field">
                  <label for="name">{{ 'Login' }}</label>
                  <input id="name" type="text"
                         class="form-control @error('name') is-invalid @enderror" name="name"
                         value="{{ old('name') }}" required autocomplete="name" autofocus>

                  @error('name')
                  <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                  </span>
                  @enderror
                </div>
              </div>

              <div class="row">
                <div class="input-field">
                  <label for="password">{{ __('Password') }}</label>

                  <input id="password" type="password"
                         class="form-control @error('password') is-invalid @enderror" name="password"
                         required autocomplete="current-password">

                  @error('password')
                  <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                  </span>
                  @enderror
                </div>
              </div>

              <div class="row">
                <label>
                  <input class="filled-in" type="checkbox" name="remember"
                         id="remember" {{ old('remember') ? 'checked' : '' }}>
                  <span>{{ __('Remember Me') }}</span>
                </label>
              </div>

              <div class="row">
                <div class="form-input">
                  <button type="submit" class="btn teal">
                    {{ __('Login') }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection