import PassportApi from '@/commands/passport';

export default {
  login: async ({ commit }, { username, password }) => {
    try {
      const response = await PassportApi.login({ username, password });
      commit('LOGIN', { token: response.data });
    } catch (error) {
      throw new Error(error);
    }
  },

  logout: async ({ commit }) => {
    try {
      await PassportApi.logout();
      commit('LOGOUT');
    } catch (error) {
      throw new Error(error);
    }
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
