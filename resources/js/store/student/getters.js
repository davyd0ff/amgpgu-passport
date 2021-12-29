export default {
  student: function (state) {
    return state.info;
  },
  studentEducations: function (state) {
    return state.educations;
  },
  planEducation: (state) => (academicPlanCode) => {
    return state.educations.find(
      (education) => education.academicPlanCode === academicPlanCode
    );
  },
};
