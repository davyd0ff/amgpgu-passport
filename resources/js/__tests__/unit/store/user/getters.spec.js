import getters from '@/store/user/getters.js';

describe("store: user's getters", () => {
  describe('isAuthenticated', () => {
    it('is truthy', () => {
      const state = {};
      const token = { token: { access: 'TEST_ACCESS_TOKEN' } };
      window.localStorage.__proto__.getItem = jest.fn(() =>
        JSON.stringify(token)
      );

      const isAuthenticated = getters.isAuthenticated(state);

      expect(isAuthenticated).toBeTruthy();
      expect(window.localStorage.__proto__.getItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.__proto__.getItem).toHaveBeenCalledWith(
        'token'
      );
    });

    it('is falsy', () => {
      const state = {};
      window.localStorage.__proto__.getItem = jest.fn(() => null);

      const isAuthenticated = getters.isAuthenticated(state);

      expect(isAuthenticated).toBeFalsy();
      expect(window.localStorage.__proto__.getItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.__proto__.getItem).toHaveBeenCalledWith(
        'token'
      );
    });
  });
});
