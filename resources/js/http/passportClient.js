import axios from 'axios';
import { httpUnauthorized, httpForbidden } from './codes';
import BACKEND_ENDPOINTS from '@/backend-endpoints/passport';

// todo development: как будет авторизовываться пользователь?
//                  если включены preProcessing и postProcessing

export default class PassportClient {
  constructor(options = {}) {
    options = { enableProcessing: true, ...options };

    this.setHeaders(options);
    this.setClient(options);

    if (options.enableProcessing) {
      this.setPreProcessing();
      this.setPostProcessing();
    }
  }

  setHeaders(options = {}) {
    this.headers = {
      ...{
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      ...(options.headers ?? {}),
    };
  }

  setClient(options) {
    this.client = axios.create({
      ...(options ?? {}),
      headers: this.headers,
    });
  }

  setPreProcessing() {
    this.client.interceptors.request.use(
      (config) => {
        // todo fixme: change localstorage to CoR
        const token = JSON.parse(window.localStorage.getItem('token'));
        if (!token) {
          return config;
        }

        const headers = {
          ...this.headers,
          Authorization: `${token.token_type} ${token.access_token}`,
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')
            .content,
        };

        return { ...config, headers };
      },
      (error) => Promise.reject(error)
    );
  }

  setPostProcessing() {
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === httpForbidden) {
          // todo fixme: change magic row
          throw Error('USER_IS_UNAUTHORIZED');
        }

        if (
          error.response &&
          error.response.status === httpUnauthorized &&
          !error.config.retry
        ) {
          await this.createRefreshTokenRequest();

          const newRequest = { ...error.config, retry: true };
          return this.client.request(newRequest);
        }

        return Promise.reject(error);
      }
    );
  }

  async createRefreshTokenRequest() {
    // todo fixme: change localStorage to managerStorage (CoR)
    const token = JSON.parse(window.localStorage.getItem('token'));

    if (!token) {
      return;
    }

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    const config = {
      ...BACKEND_ENDPOINTS.refreshToken(),
      headers,
      data: {
        refresh_token: token.refresh_token,
      },
    };
    const newToken = await axios.request(config);

    window.localStorage.setItem('token', JSON.stringify(newToken.data));
  }

  request(config) {
    return this.client.request(config);
  }
  post(config) {
    return this.client.post(config);
  }
  get(config) {
    return this.client.get(config);
  }
}
