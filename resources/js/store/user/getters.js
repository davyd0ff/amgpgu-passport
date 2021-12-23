export default {
  user: function (state) {
    return state.user;
  },
  avatar: function (state) {
    return state.user.avatar ?? '';
  },
  menu: function (state) {
    return state.user.menu;
  },
};
