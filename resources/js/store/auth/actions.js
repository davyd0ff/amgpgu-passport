import tokenRepository from '../repositories/tokenRepository';
import PassportApi from '@/commands/passport';

export default {
  saveToken: ({ commit }, token) => {
    commit('LOGIN', { token });
  },
  checkAuth: ({ commit }) => {
    try {
      const token = tokenRepository.getToken();
      if (token !== null) {
        commit('LOGIN', { token });
      }
    } catch (error) {
      throw error;
    }
  },
  login: async ({ commit }, { username, password }) => {
    try {
      const token = await PassportApi.login({ username, password });
      commit('LOGIN', { token });
    } catch (error) {
      throw error;
    }
  },
  logout: async ({ commit }) => {
    try {
      await PassportApi.logout();
      commit('LOGOUT');
    } catch (error) {
      throw error;
    }
  },
};
