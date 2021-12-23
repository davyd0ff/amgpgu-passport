<template>
  <button class="btn btn-danger" v-on:click="onClick">
    <i class="medium material-icons">delete</i>
  </button>
</template>

<script>
export default {
  name: 'FileDeleteButton',
  methods: {
    onClick: function () {
      this.$emit('delete-file');
      // this.onDeleteFile().then(() => {
      //   this.$message('DELETE_FILE_FILE_WAS_DELETED');
      // });
      // .catch((_) => {});
    },
  },
};
</script>

<style scoped></style>
