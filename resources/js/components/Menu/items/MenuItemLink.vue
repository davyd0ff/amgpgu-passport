<template>
  <router-link v-bind:to="item.url" class="waves-effect waves-teal" v-bind:class="{teal: isLinkActive}">
    {{ item.title | localize }}
    <slot/>
  </router-link>
</template>

<script>
export default {
  name: "MenuItemLink",
  props: {
    item: Object
  },
  computed: {
    isLinkActive: function () {
      return this.$route.path === this.item.url;
    }
  }
}
</script>

<style scoped>

</style>