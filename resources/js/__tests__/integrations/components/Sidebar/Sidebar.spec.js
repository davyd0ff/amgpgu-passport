import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import Sidebar from '@/components/Sidebar/Sidebar.vue';
import userGetters from '@/store/user/getters';
import studentGetters from '@/store/student/getters';

import { adminData as userData } from '@/__tests__/__fixtures__/userData';
import { fullMenu as userMenu } from '@/__tests__/__fixtures__/userMenu';
import { studentDataHasSeveralEducations as studentData } from '@/__tests__/__fixtures__/studentData';

describe('Sidebar', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);
  localVue.filter('localize', (str) => str);

  const makeWrapper = (options = {}) => {
    const $route = {
      path: 'TEST',
    };

    return mount(Sidebar, {
      localVue,
      stubs: ['fragment', 'router-link'],
      mocks: {
        $route,
      },
      ...options,
    });
  };

  it('render', () => {
    const store = new Vuex.Store({
      state: {
        educations: studentData.educations,
        info: userData,
        menu: userMenu,
      },
      getters: { ...userGetters, ...studentGetters },
    });

    const wrapper = makeWrapper({
      store,
    });

    expect(wrapper).toMatchSnapshot();
  });
});
