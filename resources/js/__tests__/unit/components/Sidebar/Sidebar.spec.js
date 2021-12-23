import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Sidebar from '@/components/Sidebar/Sidebar.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Sidebar.vue', () => {
  it('render', () => {
    const store = new Vuex.Store();

    const wrapper = shallowMount(Sidebar, {
      store,
      localVue,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('computed property isStudent is truthy, others are Falsy', () => {
    const store = new Vuex.Store({
      state: {
        menu: {
          student: ['TEST'],
        },
      },
      getters: {
        menu: (state) => {
          return state.menu;
        },
      },
    });

    const wrapper = shallowMount(Sidebar, {
      store,
      localVue,
    });

    expect(wrapper.vm.isListener).toBeFalsy();
    expect(wrapper.vm.hasAccessAdminMenu).toBeFalsy();
    expect(wrapper.vm.isStudent).toBeTruthy();
  });

  it('computed property isListener is truthy, others are Falsy', () => {
    const store = new Vuex.Store({
      state: {
        menu: {
          listener: ['TEST'],
        },
      },
      getters: {
        menu: (state) => {
          return state.menu;
        },
      },
    });

    const wrapper = shallowMount(Sidebar, {
      store,
      localVue,
    });

    expect(wrapper.vm.isListener).toBeTruthy();
    expect(wrapper.vm.hasAccessAdminMenu).toBeFalsy();
    expect(wrapper.vm.isStudent).toBeFalsy();
  });

  it('computed property hasAccessAdminMenu is truthy, others are Falsy', () => {
    const store = new Vuex.Store({
      state: {
        menu: {
          admin: ['TEST'],
        },
      },
      getters: {
        menu: (state) => {
          return state.menu;
        },
      },
    });

    const wrapper = shallowMount(Sidebar, {
      store,
      localVue,
    });

    expect(wrapper.vm.isListener).toBeFalsy();
    expect(wrapper.vm.hasAccessAdminMenu).toBeTruthy();
    expect(wrapper.vm.isStudent).toBeFalsy();
  });
});
