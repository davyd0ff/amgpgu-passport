export default {
  state: () => ({}),
  getters: {
    error(state) {
      return state;
    },
  },
  mutations: {
    SET_ERROR(state, error) {
      state = error;
    },
    CLEAR_ERROR(state) {
      state = {};
    },
  },
  actions: {
    setError(context, payload) {
      context.commit('SET_ERROR', payload);
    },
    clearError: function (context) {
      context.commit('CLEAR_ERROR');
    },
  },
};
