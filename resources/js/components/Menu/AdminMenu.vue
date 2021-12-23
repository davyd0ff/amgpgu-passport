<template>
  <fragment>
    <menu-item
      v-for="item in menu"
      v-bind:key="item.title"
      v-bind:item="item"
    />
  </fragment>
</template>

<script>
import MenuItem from './items/MenuItem';

export default {
  name: 'AdminMenu',
  components: { MenuItem },
  props: {
    menu: Array,
  },
};
</script>

<style scoped></style>
