import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import PassportClient from '@/http/passportClient';
import { httpUnauthorized } from '@/http/codes';
import PASSPORT_BACKEND_POINTS from '@/backend-endpoints/passport';

describe('Test PassportClient', () => {
  const TEST_ACCESS_TOKEN = 'TEST_ACCESS_TOKEN';
  const TEST_TOKEN_TYPE = 'TEST_TOKEN_TYPE';
  const TEST_REFRESH_TOKEN = 'TEST_REFRESH_TOKEN';
  const TEST_URL = 'TEST_URL';
  const TEST_X_CSRF_TOKEN = 'TEST-X-CSRF-TOKEN';
  const AxiosMockAdapter = new MockAdapter(axios);

  beforeAll(() => {
    document.querySelector = jest.fn().mockImplementation((_) => ({
      content: TEST_X_CSRF_TOKEN,
    }));

    window.localStorage.__proto__.getItem = jest.fn((_) =>
      JSON.stringify({
        refresh_token: TEST_REFRESH_TOKEN,
        access_token: TEST_ACCESS_TOKEN,
        token_type: TEST_TOKEN_TYPE,
      })
    );
  });

  beforeEach(() => {});

  it('PassportClient send request to server and receive some data', (done) => {
    AxiosMockAdapter.onGet(TEST_URL).reply(200, 'TEST');

    const passportClient = new PassportClient({});
    passportClient.get(TEST_URL).then((response) => {
      expect(response.config.headers).toStrictEqual({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `${TEST_TOKEN_TYPE} ${TEST_ACCESS_TOKEN}`,
        'X-CSRF-TOKEN': TEST_X_CSRF_TOKEN,
      });
      expect(response.data).toBe('TEST');

      done();
    });
  });

  it('Passport send request via refresh token', (done) => {
    const TEST_NEW_ACCESS_TOKEN = 'TEST_NEW_ACCESS_TOKEN';
    window.localStorage.__proto__.setItem = jest.fn();
    AxiosMockAdapter.onPost(TEST_URL)
      .replyOnce(httpUnauthorized, 'USER_IS_UNAUTHORIZED')
      .onPost(PASSPORT_BACKEND_POINTS.refreshToken().url)
      .reply(200, {
        refresh_token: TEST_REFRESH_TOKEN,
        access_token: TEST_NEW_ACCESS_TOKEN,
        token_type: TEST_TOKEN_TYPE,
      })
      .onPost(TEST_URL)
      .reply(200, 'TEST OK');

    const passportClient = new PassportClient({});
    passportClient.post(TEST_URL).then((response) => {
      expect(window.localStorage.__proto__.setItem).toHaveBeenCalledWith(
        'token',
        JSON.stringify({
          refresh_token: TEST_REFRESH_TOKEN,
          access_token: TEST_NEW_ACCESS_TOKEN,
          token_type: TEST_TOKEN_TYPE,
        })
      );
      expect(response.config).toHaveProperty('retry');
      expect(response.config.retry).toBeTruthy();
      expect(response.data).toBe('TEST OK');

      done();
    });
  });

  it('passport cannot refresh token', (done) => {
    AxiosMockAdapter.onPost(TEST_URL)
      .reply(httpUnauthorized, {})
      .onPost(PASSPORT_BACKEND_POINTS.refreshToken().url)
      .reply(httpUnauthorized, {
        message_error: 'Token cannot be updated',
      });

    const passportClient = new PassportClient({});
    passportClient
      .post(TEST_URL)
      .then((response) => response)
      .catch((err) => {
        expect(err.response.status).toBe(httpUnauthorized);
        expect(err.config.url).toBe(PASSPORT_BACKEND_POINTS.refreshToken().url);

        done();
      });
  });
});
