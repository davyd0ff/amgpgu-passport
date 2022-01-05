export default {
  student: (state) => {
    return state.info;
  },
  studentEducations: (state) => {
    return state.educations || [];
  },
  planEducation: (state) => (academicPlanCode) => {
    return (
      state.educations.find(
        (education) => education.academicPlanCode === academicPlanCode
      ) || {}
    );
  },
};
