import mutations from '@/store/user/mutations';

describe('test user mutations', () => {
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

    mutations.LOGIN(state, { token });

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
    let state = { user: 'some data', student: 'some data' };

    mutations.LOGOUT(state);

    expect(state).toStrictEqual({});
    expect(window.localStorage.__proto__.removeItem).toHaveBeenCalledWith(
      'token'
    );
  });

  it('SET_USER', () => {
    const state = {};
    const user = 'TEST';

    mutations.SET_USER(state, { user });

    expect(state.user).toBe(user);
  });

  it('SET_AVATAR', () => {
    const state = {};
    const url = 'TEST';

    mutations.SET_AVATAR(state, { url });

    expect(state.user.avatar).toBe(url);
  });

  describe('GET_MENU', () => {
    it('menu was added', () => {
      const state = {};
      const menu = 'TEST';

      mutations.SET_MENU(state, { menu });

      expect(state.user.menu).toBe(menu);
    });

    it('smoke: menu was added and user is not changed', () => {
      const TEST_USER_NAME = 'TEST_USER';
      const user = {
        name: TEST_USER_NAME,
      };
      const state = { user };
      const menu = [{ TEST_ITEM: [] }];

      mutations.SET_MENU(state, { menu });

      expect(state.user.name).toBe(TEST_USER_NAME);
      expect(state.user.menu).toStrictEqual(menu);
    });
  });
});
