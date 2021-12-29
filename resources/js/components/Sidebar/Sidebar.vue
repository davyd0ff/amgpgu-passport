<template>
  <aside>
    <ul
      id="sidenav-left"
      class="sidenav sidenav-fixed grey-text text-darken-4"
      ref="sidenav"
    >
      <li>
        <user-info />
      </li>
      <li class="no-padding">
        <ul ref="collapsible" class="collapsible collapsible-accordion">
          <student-menu v-if="isStudent" v-bind:menu="studentMenu" />
          <listener-menu v-if="isListener" v-bind:menu="listenerMenu" />
          <admin-menu v-if="hasAccessAdminMenu" v-bind:menu="adminMenu" />
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script>
import M from 'materialize-css';

import StudentMenu from '@/components/Menu/StudentMenu';
import ListenerMenu from '@/components/Menu/ListenerMenu';
import AdminMenu from '@/components/Menu/AdminMenu';
import UserInfo from './UserInfo';

export default {
  name: 'Sidebar',
  components: { AdminMenu, ListenerMenu, StudentMenu, UserInfo },

  computed: {
    adminMenu() {
      return this.$store.getters.adminMenu;
    },
    listenerMenu() {
      return this.$store.getters.listenerMenu;
    },
    studentMenu() {
      return this.$store.getters.studentMenu;
    },
    isStudent() {
      return this.studentMenu.length > 0;
    },
    isListener() {
      return this.listenerMenu.length > 0;
    },
    hasAccessAdminMenu() {
      return this.adminMenu.length > 0;
    },
  },

  mounted() {
    this.$sidenav = M.Sidenav.init(this.$refs.sidenav);
    this.$collapsible = M.Collapsible.init(this.$refs.collapsible);
    // M.AutoInit();
  },
  destroyed() {
    this.$sidenav.destroy();
    this.$collapsible.destroy();
  },
};
</script>

<style scoped></style>
