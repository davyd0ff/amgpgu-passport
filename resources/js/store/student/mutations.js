import Vue from 'vue';

export default {
  SET_STUDENT(state, { student }) {
    Vue.set(state, 'info', { ...student.info });
    Vue.set(state, 'educations', [...student.educations]);
  },
};
