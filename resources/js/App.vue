<template>
  <Fragment>
    <div v-if="!isLoading">
      <Sidebar />
      <Navbar />
      <main>
        <router-view />
      </main>
    </div>
    <Loader v-else />
  </Fragment>
</template>

<script>
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Loader from './components/Loader';

export default {
  name: 'Application',
  components: { Loader, Navbar, Sidebar },
  props: {},
  data: function () {
    return {
      isLoading: false,
    };
  },
  methods: {
    loadPassportData: function () {
      return [
        this.$store.dispatch('getNotifications'),
        this.$store.dispatch('getUserData'),
        this.$store.dispatch('getUserMenu'),
        this.$store.dispatch('getStudentInfo'),
      ];
    },
  },

  mounted() {
    this.isLoading = true;

    Promise.all(this.loadPassportData()).finally(() => {
      this.isLoading = false;
    });
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

@import '~materialize-css/dist/css/materialize.min.css';
//@import '~vuetify/dist/vuetify.min.css';
@import './assets/app.css';
@import './assets/fileInput.css';
@import './assets/sidenav.css';
@import './assets/dropDownNotifications.css';
</style>
