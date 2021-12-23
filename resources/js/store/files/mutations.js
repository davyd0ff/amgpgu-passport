export default {
  ADD_FILES: (state, { context, files }) => {
    // console.log('store.files.mutations.addFiles()', context, files);
    // todo develop: save/replace files-info into storage
    state.files = {
      ...state.files,
      [context]: [...state.files[context], ...files],
    };
  },

  LOAD_FILES: (state, { context, files }) => {
    // todo develop: save/replace files-info into storage
    state.files = { ...state.files, [context]: [...files] };
  },

  DELETE_FILES: (state, { context, fileId }) => {
    state.files = {
      ...state.files,
      [context]: [...state.files[context].filter((file) => file.id !== fileId)],
    };
  },
};
