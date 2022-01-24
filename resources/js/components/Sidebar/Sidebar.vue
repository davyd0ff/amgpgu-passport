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
          <passport-menu v-if="isStudent" v-bind:menu="studentMenu" />
          <passport-menu v-if="isListener" v-bind:menu="listenerMenu" />
          <passport-menu v-if="hasAccessAdminMenu" v-bind:menu="adminMenu" />
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script>
import M from 'materialize-css';

import UserInfo from './UserInfo';
import PassportMenu from '@/components/Menu';
import studentMenuFactory from '@/factories/studentMenuFactory';
import mapper from '@/frontend-points/mapperMenuItems.js';

export default {
  name: 'Sidebar',
  components: { PassportMenu, UserInfo },

  computed: {
    adminMenu() {
      return [...this.$store.getters.adminMenu].map((item) => mapper(item));
    },
    listenerMenu() {
      return [...this.$store.getters.listenerMenu].map((item) => mapper(item));
    },
    studentMenu() {
      const generalMenu = [...this.$store.getters.studentMenu].map((item) =>
        mapper(item)
      );
      const educationMenu = [...this.$store.getters.studentEducations].map(
        (education) => mapper(studentMenuFactory.make(education))
      );

      const firstMenuItem = generalMenu[0];
      if (firstMenuItem) {
        firstMenuItem.items = [
          ...educationMenu,
          ...(firstMenuItem.items || []),
        ];
      }

      return generalMenu;
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
