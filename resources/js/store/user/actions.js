import PassportApi from '@/commands/passport';

export default {
  saveUserData: ({ commit }, user) => {
    commit('SET_USER', { user });
  },

  getUserData: async ({ commit }) => {
    try {
      const user = await PassportApi.getUserData();
      commit('SET_USER', { user });
    } catch (error) {
      throw error;
    }
  },

  getUserMenu: async ({ commit }) => {
    try {
      const menu = await PassportApi.getUserMenu();
      commit('SET_MENU', { menu });
    } catch (error) {
      throw error;
    }
  },

  uploadAvatar: async ({ commit }, { file }) => {
    try {
      const url = await PassportApi.uploadAvatar(file);
      commit('SET_AVATAR', { url });
    } catch (error) {
      throw error;
    }
  },
};
