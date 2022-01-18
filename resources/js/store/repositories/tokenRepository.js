const nameKeyForTokenInStorage = 'token';

export default {
  getToken() {
    const tokenStr = window.localStorage.getItem(nameKeyForTokenInStorage);
    if (tokenStr === null) {
      return null;
    }
    return JSON.parse(tokenStr);
  },

  saveToken(token) {
    window.localStorage.setItem(
      nameKeyForTokenInStorage,
      JSON.stringify(token)
    );
  },

  removeToken() {
    window.localStorage.removeItem(nameKeyForTokenInStorage);
  },
};
