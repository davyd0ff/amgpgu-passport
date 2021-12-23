import PassportApi from '../../commands/passport';

export default {
  getStudentInfo: async ({ commit }) => {
    try {
      const response = await PassportApi.getStudentInfo();
      commit('SET_STUDENT', { student: response.data });
    } catch (err) {
      throw new Error(err);
    }
  },
};
