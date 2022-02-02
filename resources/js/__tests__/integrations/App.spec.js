import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';

import * as notifications from '@/__tests__/__fixtures__/notifications';
import * as userData from '@/__tests__/__fixtures__/userData';
import * as studentData from '@/__tests__/__fixtures__/studentData';
import * as menu from '@/__tests__/__fixtures__/userMenu';

import App from '@/App.vue';
import passport from '@/commands/passport';
import store from '@/store';

jest.mock('@/commands/passport');

describe('App.vue', () => {
  const $router = {
    push: jest.fn(),
    path: jest.fn(),
  };
  const $route = {
    meta: {
      title: 'TEST',
    },
  };

  const makeWrapper = (options = {}) => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.filter('localize', (str) => str);

    return mount(App, {
      localVue,
      store,
      mocks: {
        $router,
        $route,
      },
      stubs: ['router-view', 'router-link', 'fragment'],
      ...options,
    });
  };

  it('render', async () => {
    window.localStorage.__proto__.getItem = jest.fn(
      () => '{ "token": "TEST" }'
    );

    passport.getNotifications.mockImplementation(() =>
      Promise.resolve(notifications.notifications)
    );
    passport.getUserData.mockImplementation(() =>
      Promise.resolve(userData.adminData)
    );
    passport.getUserMenu.mockImplementation(() =>
      Promise.resolve(menu.fullMenu)
    );
    passport.getStudentData.mockImplementation(() =>
      Promise.resolve(studentData.studentDataHasSeveralEducations)
    );

    const wrapper = makeWrapper();

    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });
});
