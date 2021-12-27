import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from '@/store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.userIsAuthenticated;

  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login', meta: { ...to.meta, redirect: to.path } });
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'Home' });
  } else {
    next();
  }
});

export default router;
