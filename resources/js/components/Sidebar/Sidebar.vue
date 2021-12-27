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
          <student-menu v-if="isStudent" v-bind:menu="menu.student" />
          <listener-menu v-if="isListener" v-bind:menu="menu.listener" />
          <admin-menu v-if="hasAccessAdminMenu" v-bind:menu="menu.admin" />
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
    menu: function () {
      return this.$store.getters.menu;
    },
    isStudent: function () {
      return this.menu?.student?.length > 0 || false;
    },
    isListener: function () {
      return this.menu?.listener?.length > 0 || false;
    },
    hasAccessAdminMenu: function () {
      return this.menu?.admin?.length > 0 || false;
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
