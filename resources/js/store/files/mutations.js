export default {
  ADD_FILES: (state, { context, files }) => {
    // console.log('store.files.mutations.addFiles()', context, files);
    // todo develop: save/replace files-info into storage
    state[context] = [...state[context], ...files];
  },

  LOAD_FILES: (state, { context, files }) => {
    // todo develop: save/replace files-info into storage
    state[context] = [...files];
  },

  DELETE_FILES: (state, { context, fileId }) => {
    state[context] = [...state[context].filter((file) => file.id !== fileId)];
  },
};
