<template>
  <ul>
    <li v-for="file in files" v-bind:key="file.id">
      <div>
        <a v-bind:href="file.url" target="_blank">{{ file.name }}</a>
        <file-delete-button
          v-if="!disableDeleteButton"
          v-bind:file-id="file.id"
        />
      </div>
    </li>
  </ul>
</template>

<script>
import FileDeleteButton from './FileDeleteButton';

export default {
  name: 'FilesList',
  components: { FileDeleteButton },
  props: {
    files: { type: Array, default: [] },
    disableDeleteButton: { type: Boolean, default: false },
  },
  methods: {},
};
</script>

<style scoped></style>
