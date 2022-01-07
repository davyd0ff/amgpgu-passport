import PassportApi from '@/commands/passport';

export default {
  getStudentsTree: async ({ commit }, { facultyCode = null } = {}) => {
    try {
      const tree = await PassportApi.getStudentsTree(facultyCode);
      commit('SET_STUDENTS_TREE', { tree });
    } catch (err) {
      throw err;
    }
  },

  getEmployeeTree: async ({ commit }) => {
    throw Error('NotImplementation');
  },

  getListenerTree: async ({ commit }) => {
    throw Error('NotImplementation');
  },
};
