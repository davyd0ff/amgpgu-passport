export default {
  SET_TREE: (state, { context, tree }) => {
    state[context] = { ...tree };
  },
};
