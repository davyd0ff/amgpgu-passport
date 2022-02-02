<template>
  <div class="user-view">
    <div class="background" />
    <router-link to="/profile">
      <div class="avatar circle" />
    </router-link>
    <router-link to="/profile">
      <span class="black-text name">{{ username }}</span>
    </router-link>
    <router-link to="/profile">
      <span class="black-text email">{{ email }}</span>
    </router-link>
    <logout-button />
  </div>
</template>

<script>
import LogoutButton from './LogoutButton';

export default {
  name: 'UserInfo',
  components: { LogoutButton },
  computed: {
    info() {
      return this.$store.getters.userInfo;
    },
    username() {
      if (this.info && this.info.lastname) {
        return `${this.info.lastname} ${this.info.firstname} ${this.info.middlename}`;
      }
      return '';
    },
    email() {
      if (this.info && this.info.email) {
        return this.info.email;
      }
      return '';
    },
  },
};
</script>

<style scoped></style>
