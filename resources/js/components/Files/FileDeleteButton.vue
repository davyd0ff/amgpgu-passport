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
    },
  },
};
</script>

<style scoped></style>
