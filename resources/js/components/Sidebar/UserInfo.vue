<template>
  <div class="user-view">
    <div class="background">
      <img
        src="https://www.las.ru/media/foto/kabinet-rukovoditelya-seventies-foto-01-a.jpg"
      />
    </div>
    <router-link to="/profile">
      <img
        class="circle"
        src="https://sun9-11.userapi.com/impf/c638426/v638426062/50419/eNL3yaz6niM.jpg?size=300x300&quality=96&proxy=1&sign=281eca8b1027b3a552a1e591fd6d5019&type=audio"
      />
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
    info: function () {
      return this.$store.getters.user;
    },
    username: function () {
      if (this.info && this.info.lastname) {
        return `${this.info.lastname} ${this.info.firstname} ${this.info.middlename}`;
      }
      return '';
    },
    email: function () {
      if (this.info && this.info.email) {
        return this.info.email;
      }
      return '';
    },
  },
};
</script>

<style scoped></style>
