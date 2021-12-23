export default {
  state: {
    error: null,
  },
  getters: {
    error: function (state) {
      return state.error;
    },
  },
  mutations: {
    setError: function (state, error) {
      state.error = error;
    },
    clearError: function (state) {
      state.error = null;
    },
  },
  actions: {
    setError: function (context, payload) {
      context.commit('setError', payload);
    },
    clearError: function (context) {
      context.commit('clearError');
    },
  },
};
