import PassportApi from '../../commands/passport';

export default {
  attachFiles: ({ commit }, { context, files }) => {
    // console.log('store.files.actions.attachFiles()', context, files);
    commit('ADD_FILES', { context, files });
  },

  deleteFile: async ({ rootGetters, commit }, { fileId }) => {
    try {
      await PassportApi.deleteFile(fileId);
      commit('DELETE_FILES', { fileId });
    } catch (err) {
      // todo develop: set error to store
      throw Error(err);
    }
  },

  getFiles: async ({ rootGetters, commit }, { context }) => {
    try {
      const response = await PassportApi.getFiles(context);
      commit('LOAD_FILES', { context, files: Object.values(response.data) });
    } catch (err) {
      // todo develop: set error to store
      throw Error(err);
    }
  },
};
