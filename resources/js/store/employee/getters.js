export default {
  tree: (state) => (context) => {
    // todo develop: add Storage logic
    return state[context] || {};
  },
};
