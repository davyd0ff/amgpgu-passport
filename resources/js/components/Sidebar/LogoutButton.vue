<template>
  <a
    href="#"
    class="black-text exit-to-app"
    v-on:click.prevent="onLogout"
    title="LOGIN_LOGOUT"
  >
    <i class="material-icons">exit_to_app</i>
  </a>
</template>

<script>
export default {
  name: 'LogoutButton',
  methods: {
    onLogout: function () {
      this.$store.dispatch('logout').then(() => {
        // route to login
      });
    },
  },
};
</script>

<style scoped></style>
