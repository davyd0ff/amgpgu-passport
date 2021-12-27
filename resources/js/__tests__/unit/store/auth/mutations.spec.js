import auth from '@/store/auth';

describe('test auth mutations', () => {
  it('LOGIN', () => {
    window.localStorage.__proto__.setItem = jest.fn();
    const TEST_ACCESS_TOKEN = 'TEST_ACCESS_TOKEN';
    const TEST_REFRESH_TOKEN = 'TEST_REFRESH_TOKEN';
    const TEST_TOKEN_TYPE = 'TEST_TOKEN_TYPE';
    const token = {
      access_token: TEST_ACCESS_TOKEN,
      refresh_token: TEST_REFRESH_TOKEN,
      type_token: TEST_TOKEN_TYPE,
    };
    const state = {};

    auth.mutations.LOGIN(state, { token });

    expect(window.localStorage.__proto__.setItem).toHaveBeenCalledWith(
      'token',
      JSON.stringify({
        access_token: TEST_ACCESS_TOKEN,
        refresh_token: TEST_REFRESH_TOKEN,
        type_token: TEST_TOKEN_TYPE,
      })
    );
  });

  it('LOGOUT', () => {
    window.localStorage.__proto__.removeItem = jest.fn();
    const state = { isAuthenticated: true };

    auth.mutations.LOGOUT(state);

    expect(state.isAuthenticated).toBeFalsy();
    expect(window.localStorage.__proto__.removeItem).toHaveBeenCalledWith(
      'token'
    );
  });
});
