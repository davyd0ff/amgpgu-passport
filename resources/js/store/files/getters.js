export default {
  files: (state) => (context) => {
    return state.files[context] || [];
  },
};
