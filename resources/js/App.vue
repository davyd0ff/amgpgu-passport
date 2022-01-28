<template>
  <Fragment>
    <div v-if="!isLoading">
      <Sidebar v-if="isAuthenticated" />
      <Navbar v-if="isAuthenticated" />
      <main>
        <router-view />
      </main>
    </div>
    <Loader v-else />
  </Fragment>
</template>

<script>
import Loader from './components/Loader';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

export default {
  name: 'Application',
  components: { Loader, Sidebar, Navbar },
  props: {
    user: { type: String },
    token: { type: String },
  },
  mounted() {
    const token = JSON.parse(this.token);
    const user = JSON.parse(this.user);
    const isEmptyObject = (value) =>
      value && Object.keys(value).length === 0 && value.constructor === Object;

    if (!this.isAuthenticated) {
      if (isEmptyObject(token) || isEmptyObject(user)) {
        this.$router.push('/login', () => window.location.reload());
      } else {
        this.$store.dispatch('saveToken', token);
        this.$store.dispatch('saveUserData', this.user);
      }
    }
  },
  data: function () {
    return {
      isLoading: false,
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.userIsAuthenticated;
    },
  },
  watch: {
    isAuthenticated: {
      handler: 'loadPassportData',
      immediate: true,
    },
  },
  methods: {
    loadPassportData: function () {
      const data = [
        this.$store.dispatch('getNotifications'),
        this.$store.dispatch('getUserData'),
        this.$store.dispatch('getUserMenu'),
        this.$store.dispatch('getStudentInfo'),
      ];
      if (this.isAuthenticated) {
        this.isLoading = true;
        Promise.all(data)
          .catch(() => {})
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
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
