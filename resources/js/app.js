/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

const vuelidate = require('vuelidate');
const fragment = require('vue-fragment');
const vuetify = require('vuetify');
const store = require('./store').default;
const router = require('./router').default;
const messagePlugin = require('./utils/message.plugin').default;
const localizeFilter = require('./filters/localize.filter').default;
window.Vue = require('vue');

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

Vue.component('app-component', require('./App.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.use(vuelidate);
Vue.use(fragment.Plugin);
Vue.use(vuetify);
Vue.use(messagePlugin);

Vue.filter('localize', localizeFilter);

const app = new Vue({
  store,
  router,
  el: '#app',
  vuetify: new vuetify(),
});
