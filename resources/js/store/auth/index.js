import PassportApi from '@/commands/passport';

export default {
  state: () => ({
    isAuthenticated: false,
  }),
  getters: {
    userIsAuthenticated: (state) => {
      const hasToken = window.localStorage.getItem('token');

      return state.isAuthenticated || hasToken;
    },
  },
  actions: {
    checkAuth: ({ commit }) => {
      try {
        const token = window.localStorage.getItem('token');
        if (token !== null) {
          commit('LOGIN', { token: JSON.parse(token) });
        }
      } catch (error) {
        throw new Error(error);
      }
    },
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
  },
  mutations: {
    LOGIN: (state, { token }) => {
      // todo development: save token
      window.localStorage.setItem('token', JSON.stringify(token));
      state.isAuthenticated = true;
    },
    LOGOUT: (state) => {
      // todo fixme: This doesn't reset state ... wtf?
      window.localStorage.removeItem('token');
      state.isAuthenticated = false;
    },
  },
};
