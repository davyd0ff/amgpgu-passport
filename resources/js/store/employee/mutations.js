export default {
  SET_STUDENTS_TREE: (state, { tree }) => {
    state.trees.students = { ...tree };
  },
  SET_EMPLOYEES_TREE: (state, { tree }) => {
    state.trees.employees = { ...tree };
  },
  SET_LISTENERS_TREE: (state, { tree }) => {
    state.trees.listeners = { ...tree };
  },
};
