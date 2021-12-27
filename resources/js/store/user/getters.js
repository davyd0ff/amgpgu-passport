export default {
  user: (state) => {
    return state ?? {};
  },
  userAvatar: (state) => {
    return state.avatar ?? '';
  },
  userMenu: (state) => {
    return state.menu;
  },
};
