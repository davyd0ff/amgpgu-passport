export default {
  SET_USER: (state, { user }) => {
    state.info = { ...user };
  },
  SET_AVATAR: (state, { url }) => {
    state.avatar = url;
  },
  SET_MENU: (state, { menu }) => {
    state.menu = { ...menu };
  },
};
