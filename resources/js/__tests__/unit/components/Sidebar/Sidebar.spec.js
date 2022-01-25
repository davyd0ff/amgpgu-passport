import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Sidebar from '@/components/Sidebar/Sidebar.vue';
import userGetters from '@/store/user/getters';
import studentGetters from '@/store/student/getters';

import * as studentData from '@/__tests__/__fixtures__/studentData';
import * as userMenu from '@/__tests__/__fixtures__/userMenu';

describe('Sidebar.vue', () => {
  const makeWrapper = (options = {}) => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const store = new Vuex.Store({
      getters: { ...userGetters, ...studentGetters },
    });

    return shallowMount(Sidebar, {
      localVue,
      store,
      ...options,
    });
  };

  it('render', () => {
    const wrapper = makeWrapper();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('computed property isStudent is truthy, others are Falsy', () => {
    const store = new Vuex.Store({
      state: {
        menu: {
          student: [{ title: 'TEST' }],
        },
      },
      getters: { ...userGetters, ...studentGetters },
    });

    const wrapper = makeWrapper({ store });

    expect(wrapper.vm.isListener).toBeFalsy();
    expect(wrapper.vm.hasAccessAdminMenu).toBeFalsy();
    expect(wrapper.vm.isStudent).toBeTruthy();
  });

  it('computed property isListener is truthy, others are Falsy', () => {
    const store = new Vuex.Store({
      state: {
        menu: {
          listener: [{ title: 'TEST' }],
        },
      },
      getters: { ...userGetters, ...studentGetters },
    });

    const wrapper = makeWrapper({ store });

    expect(wrapper.vm.isListener).toBeTruthy();
    expect(wrapper.vm.hasAccessAdminMenu).toBeFalsy();
    expect(wrapper.vm.isStudent).toBeFalsy();
  });

  it('computed property hasAccessAdminMenu is truthy, others are Falsy', () => {
    const store = new Vuex.Store({
      state: {
        menu: {
          admin: [{ title: 'TEST' }],
        },
      },
      getters: { ...userGetters, ...studentGetters },
    });

    const wrapper = makeWrapper({ store });

    expect(wrapper.vm.isListener).toBeFalsy();
    expect(wrapper.vm.hasAccessAdminMenu).toBeTruthy();
    expect(wrapper.vm.isStudent).toBeFalsy();
  });

  it('computed property studentMenu', () => {
    const store = new Vuex.Store({
      state: {
        educations: [{ group: 'TEST_GROUP' }],
        menu: {
          student: [
            {
              title: 'TEST_INDEX',
              items: [
                {
                  title: 'TEST_SUB_INDEX',
                },
              ],
            },
          ],
        },
      },
      getters: { ...userGetters, ...studentGetters },
    });

    const wrapper = makeWrapper({ store });

    expect(wrapper.vm.studentMenu).toEqual([
      {
        title: 'TEST_INDEX',
        items: [
          {
            title: 'TEST_GROUP',
            items: expect.any(Array),
          },
          {
            title: 'TEST_SUB_INDEX',
          },
        ],
      },
    ]);
  });
});
