import PassportApi from '@/commands/passport';

export default {
  getFiles: async ({ commit }, { context }) => {
    try {
      const files = await PassportApi.getFiles(context);
      console.log('store/files/actions/getFiles()', files);

      commit('LOAD_FILES', { context, files });
    } catch (error) {
      // todo develop: set error to store
      throw error;
    }
  },

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
      console.log('store/files/actions/attachFiles()', uploadedFiles);
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
};
