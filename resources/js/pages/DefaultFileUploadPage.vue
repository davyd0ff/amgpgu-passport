<template>
  <div class="row">
    <div class="col s12">
      <div class="card">
        <div class="card-content">
          <file-upload-form v-bind:upload-files="onUpload" />
          <files-table v-bind:files="files" v-on:delete-file="onDelete" />
          <loader v-if="isLoading" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilesTable from '@/components/Files/FilesTable';
import FileUploadForm from '@/components/Files/FileUploadForm';
import Loader from '@/components/Loader';

export default {
  name: 'DefaultFileUploadPage',
  components: { FileUploadForm, FilesTable, Loader },
  props: {
    context: String,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  watch: {
    context: {
      handler: 'onDownload',
      immediate: true,
    },
  },
  destroyed() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  },
  computed: {
    files() {
      return this.$store.getters.files(this.context);
    },
  },
  methods: {
    onDownload() {
      this.isLoading = true;
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = window.setTimeout(
        () =>
          this.$store
            .dispatch('getFiles', { context: this.context })
            .catch((error) => {
              this.$error(error);
            })
            .finally(() => {
              this.isLoading = false;
            }),
        1000
      );
    },
    onUpload(filesToUpload, fnProgress) {
      // todo think: имхо костыль
      return this.$store
        .dispatch('attachFiles', {
          context: this.context,
          files: filesToUpload,
          progressCallback: fnProgress,
        })
        .catch((error) => {
          this.$error(error);
          return Promise.reject({});
        });
    },
    onDelete(fileId) {
      this.$store
        .dispatch('deleteFile', { context: this.context, fileId })
        .then(() => this.$message('DELETE_FILE_FILE_WAS_DELETED'))
        .catch((error) => this.$error(error));
    },
  },
};
</script>

<style scoped></style>
