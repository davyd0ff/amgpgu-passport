<template>
  <a v-on:click.prevent
     href="#"
     class="collapsible-header waves-effect waves-teal"
     tabindex="0"
  >
    {{ item.title | localize }}
    <slot/>
  </a>
</template>

<script>
export default {
  name: "MenuItemDefault",
  props: {
    item: Object
  }
}
</script>

<style scoped>

</style>