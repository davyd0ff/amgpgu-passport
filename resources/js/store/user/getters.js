export default {
  user: (state) => {
    return state ?? {};
  },
  avatar: (state) => {
    return state.avatar ?? '';
  },
  menu: (state) => {
    return state.menu;
  },
};
