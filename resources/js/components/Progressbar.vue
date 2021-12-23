<template>
  <div class="progress" v-if="isVisible">
    <div class="determinate" v-bind:style="{ width: `${progress}%` }"></div>
  </div>
</template>

<script>
export default {
  name: 'Progressbar',
  props: {
    progress: {
      type: Number,
    },
  },
  data: () => ({
    isVisible: false,
  }),
  watch: {
    progress: function (value) {
      this.isVisible = value >= 0;

      if (value >= 100) {
        setTimeout(() => {
          this.isVisible = false;
        }, 500);
      }
    },
  },
};
</script>

<style scoped></style>
