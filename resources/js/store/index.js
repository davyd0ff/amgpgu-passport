import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
// import info from './info';
// import error from './error';
import student from './student';
import files from './files';
import user from './user';
import employee from './employee';
import notifications from './notifications';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    student,
    files,
    employee,
    notifications,
  },
});
