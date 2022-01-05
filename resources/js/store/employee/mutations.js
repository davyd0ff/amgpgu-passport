export default {
  SET_TREE: (state, { context, tree }) => {
    Vue.set(state, context, { ...tree });
  },
};
