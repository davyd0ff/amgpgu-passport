export default {
  student: function (state) {
    return state;
  },
  educations: function (state) {
    return state.educations;
  },
  education: (state) => (academicPlanCode) => {
    return state.educations.find(
      (education) => education.academicPlanCode === academicPlanCode
    );
  },
};
