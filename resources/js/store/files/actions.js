import PassportApi from '@/commands/passport';

export default {
  attachFiles: async (
    { commit },
    { context, files, progressCallback = () => {} }
  ) => {
    try {
      const uploadedFiles = await PassportApi.uploadFiles(
        files,
        context,
        progressCallback
      );
      commit('ADD_FILES', { context, files: uploadedFiles });
    } catch (error) {
      throw error;
    }
  },

  deleteFile: async ({ commit }, { context, fileId }) => {
    try {
      await PassportApi.deleteFile(fileId);
      commit('DELETE_FILES', { context, fileId });
    } catch (err) {
      // todo develop: set error to store
      throw err;
    }
  },

  getFiles: async ({ commit }, { context }) => {
    try {
      const files = await PassportApi.getFiles(context);
      commit('LOAD_FILES', { context, files });
    } catch (error) {
      // todo develop: set error to store
      throw error;
    }
  },
};
