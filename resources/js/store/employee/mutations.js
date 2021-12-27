export default {
  SET_TREE: (state, { context, tree }) => {
    state = { ...state, [context]: { ...tree } };
  },
};
