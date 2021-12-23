<template>
  <li class="bold">
    <menu-item-link v-if="isItemLink" v-bind:item="item">
      <i v-if="isItemGroup" class="material-icons chevron">chevron_left</i>
    </menu-item-link>
    <menu-item-default v-else v-bind:item="item">
      <i v-if="isItemGroup" class="material-icons chevron">chevron_left</i>
    </menu-item-default>
    <div v-if="isItemGroup > 0" class="collapsible-body">
      <ul>
        <li class="no-padding">
          <ul ref="collapsible" class="collapsible collapsible-accordion">
            <slot/>
            <menu-item v-for="_item in item.items" v-bind:key="_item.title" v-bind:item="_item"/>
          </ul>
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
import M from 'materialize-css';

import MenuItemDefault from "./MenuItemDefault";
import MenuItemLink from "./MenuItemLink";

export default {
  name: "MenuItem",
  components: {MenuItemLink, MenuItemDefault},
  props: {
    item: Object,
  },
  computed: {
    isItemGroup: function () {
      return this.item.items && this.item.items.length && this.item.items.length > 0 || this.$slots.default?.length > 0;
    },
    isItemLink: function () {
      return this.item.url && this.item.url.length > 0;
    },
  },
  mounted() {
    this.$collapsible = M.Collapsible.init(this.$refs.collapsible);
  },
  destroyed() {
    if (this.$collapsible && this.$collapsible.hasOwnProperty('destroy')) {
      this.$collapsible.destroy();
    }
  }
}
</script>

<style scoped>

</style>