export default {
  LOGIN: function (_, { token }) {
    // todo: save token
    window.localStorage.setItem('token', JSON.stringify(token));
  },
  LOGOUT: function (state) {
    // todo fixme: don't reset state ... wtf?
    state = {};
    window.localStorage.removeItem('token');
  },
  SET_USER: function (state, { user }) {
    state.user = user;
  },
  SET_AVATAR: function (state, { url }) {
    state.user = { ...state.user, avatar: url };
  },
  SET_MENU: function (state, { menu }) {
    state.user = { ...state.user, menu: menu };
  },
};
