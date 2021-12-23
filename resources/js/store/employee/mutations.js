export default {
  SET_TREE: (state, { context, tree }) => {
    state.employee = { ...state.employee, [context]: { ...tree } };
  },
};
