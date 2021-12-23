<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <!-- todo refactoring: replace magic words -->
        <th>{{ 'FILES_TABLE_COLUMN_TYPE_FILE' | localize }}</th>
        <th>{{ 'FILES_TABLE_COLUMN_NAME_FILE' | localize }}</th>
        <th>{{ 'FILES_TABLE_COLUMN_DATE_UPLOAD' | localize }}</th>
        <th>{{ 'FILES_TABLE_COLUMN_DELETE_FILE' | localize }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(file, index) in files" v-bind:key="file.id">
        <td>{{ index + 1 }}</td>
        <td>{{ file.type }}</td>
        <td>
          <a v-bind:href="file.url" target="_blank">{{ file.name }}</a>
        </td>
        <td>{{ file.created }}</td>
        <td>
          <file-delete-button v-on:delete-file="onDeleteFile(file.id)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import FileDeleteButton from './FileDeleteButton';

export default {
  name: 'FilesTable',
  components: { FileDeleteButton },
  props: {
    files: { type: Array, default: () => [] },
  },
  methods: {
    onDeleteFile: function (fileId) {
      this.$emit('delete-file', fileId);
    },
  },
};
</script>

<style scoped></style>
