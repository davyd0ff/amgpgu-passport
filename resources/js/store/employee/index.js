import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
  // namespaced: true,

  state: {
    trees: {
      students: {},
      listeners: {},
      employees: {},
    },
  },
  getters,
  mutations,
  actions,
};
