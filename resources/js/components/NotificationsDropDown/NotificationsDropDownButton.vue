<style scoped>
.dropdown-trigger i.active {
  color: #ffc65e;
}
</style>

<template>
  <a
    class="dropdown-trigger waves-effect"
    href="#"
    data-target="notification-dropdown"
    v-on:click.prevent
  >
    <i v-if="!active" class="material-icons">notifications</i>
    <i v-else class="material-icons active">notifications_active</i>
  </a>
</template>

<script>
export default {
  name: 'NotificationDropDownButton',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
