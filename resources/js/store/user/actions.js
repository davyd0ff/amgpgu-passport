import PassportApi from '@/commands/passport';

export default {
  saveUserData: ({ commit }, user) => {
    commit('SET_USER', { user });
  },

  getUserData: async ({ commit }) => {
    try {
      const response = await PassportApi.getUserData();
      commit('SET_USER', { user: response.data });
    } catch (error) {
      throw new Error(error);
    }
  },

  getUserMenu: async ({ commit }) => {
    try {
      const response = await PassportApi.getUserMenu();
      commit('SET_MENU', { menu: response.data });
    } catch (error) {
      throw new Error(error);
    }
  },

  uploadAvatar: async ({ commit }, { file }) => {
    try {
      const response = await PassportApi.uploadAvatar(file);
      commit('SET_AVATAR', { url: response.data });
    } catch (error) {
      throw new Error(error);
    }
  },
};
