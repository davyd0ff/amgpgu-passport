export default {
  files: (state) => (context) => {
    return state[context] || [];
  },
};
