export default {
  SET_USER: (state, { user }) => {
    state = { ...state, ...user };
  },
  SET_AVATAR: (state, { url }) => {
    state = { ...state, avatar: url };
  },
  SET_MENU: (state, { menu }) => {
    state = { ...state, menu: menu };
  },
};
