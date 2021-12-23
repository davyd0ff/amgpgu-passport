<template>
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <file-upload-form v-bind:upload-files="onUpload" />

          <files-table v-bind:files="files" v-on:delete-file="onDelete" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilesTable from '@/components/Files/FilesTable';
import FileUploadForm from '@/components/Files/FileUploadForm';
import passport from '@/commands/passport';

export default {
  name: 'DefaultFileUploadPage',
  components: { FileUploadForm, FilesTable },
  props: {
    context: String,
  },
  mounted() {
    this.onDownload();
  },
  computed: {
    files() {
      return this.$store.getters.files(this.context);
    },
  },
  methods: {
    onDownload() {
      this.$store
        .dispatch('getFiles', { context: this.context })
        .catch((error) => {
          this.$error(error);
        });
    },
    onUpload(filesToUpload, fnProgress) {
      return passport
        .uploadFiles(filesToUpload, this.context, fnProgress)
        .then((response) => {
          const uploadedfiles = Object.values(response.data);
          this.$store.dispatch('attachFiles', {
            context: this.context,
            files: uploadedfiles,
          });
        })
        .catch((error) => {
          this.$error(error);
          return Promise.reject(error);
        });
    },
    onDelete(fileId) {
      this.$store
        .dispatch('deleteFile', { fileId })
        .then(() => this.$message('DELETE_FILE_FILE_WAS_DELETED'))
        .catch((error) => this.$error(error));
    },
  },
};
</script>

<style scoped></style>
