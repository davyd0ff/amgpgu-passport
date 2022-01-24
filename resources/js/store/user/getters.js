export default {
  userInfo: (state) => {
    return state.info ?? {};
  },
  avatar: (state) => {
    return state.avatar ?? '';
  },
  listenerMenu: (state) => {
    return state.menu?.listener ?? [];
  },
  adminMenu: (state) => {
    return state.menu?.admin ?? [];
  },
  studentMenu: (state) => {
    return state.menu?.student ?? [];
  },
};
