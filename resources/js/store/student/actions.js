import PassportApi from '@/commands/passport';

export default {
  getStudentInfo: async ({ commit }) => {
    try {
      const student = await PassportApi.getStudentData();
      commit('SET_STUDENT', { student });
    } catch (err) {
      throw err;
    }
  },
};
