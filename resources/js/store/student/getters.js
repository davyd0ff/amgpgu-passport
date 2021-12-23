export default {
  student: function (state) {
    return state.student;
  },
  educations: function (state) {
    return state.student.educations;
  },
  education: state => academicPlanCode => {
    return state.student.educations.find(education => education.academicPlanCode === academicPlanCode);
  },
}