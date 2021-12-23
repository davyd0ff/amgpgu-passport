<template>
  <div>
    <v-file-input
      small-chips
      multiple
      label="Добавьте файлы"
      dense
      v-on:change="onChangeFiles"
    />
    <progressbar v-bind:progress="progress" />
    <div class="center-align">
      <a
        class="waves-effect btn teal"
        v-on:click="onUploadClick"
        v-bind:class="{ disabled: isUploadDisabled }"
      >
        <i class="material-icons right">cloud_upload</i>
        {{ 'FILE_UPLOAD_FORM_UPLOAD_BUTTON' | localize }}
      </a>
    </div>
  </div>
</template>

<script>
import Progressbar from '@/components/Progressbar';

export default {
  name: 'FileUploadForm',
  components: { Progressbar },
  props: {
    uploadFiles: { type: Function, default: () => Promise.resolve({}) },
  },
  data() {
    return {
      files: [],
      progress: undefined,
    };
  },
  computed: {
    isUploadDisabled() {
      return this.files.length === 0;
    },
  },
  methods: {
    onChangeFiles(files) {
      this.files = files;
    },
    onUploadClick() {
      this.uploadFiles(this.files, (progress) => {
        this.progress = Math.round((progress.loaded / progress.total) * 100);
      })
        .then(() => {
          this.files = [];
        })
        .catch(() => {});
    },
  },
};
</script>

<style scoped></style>
