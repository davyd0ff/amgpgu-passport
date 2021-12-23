import PassportApi from '../../commands/passport';

export default {
  getStudentsTree: async ({ commit }, { facultyCode = undefined }) => {
    try {
      const response = await PassportApi.getStudentsTree(facultyCode);
      commit('SET_TREE', { tree: response.data, context: 'studentsTree' });
    } catch (err) {
      // commit error
      throw Error(err);
    }
  },

  getEmployeeTree: async ({ rootGetters, commit }) => {
    throw Error('NotImplementation');
  },

  getListenerTree: async ({ rootGetters, commit }) => {
    throw Error('NotImplementation');
  },
};
