import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import NotificationsDropDown from '@/components/NotificationsDropDown/NotificationsDropDown.vue';

jest.mock('materialize-css');

describe('NotificationsDropDown', () => {
  const $router = {
    push: jest.fn(),
  };

  const makeWrapper = (options = {}) => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const store = new Vuex.Store({
      getters: {
        hasNotReadedNotifications: (_) => true,
        getNotReadedNotifications: (_) => (_) => [],
      },
    });

    return shallowMount(NotificationsDropDown, {
      localVue,
      store,
      mocks: {
        $router,
      },
      ...options,
    });
  };

  it('render', () => {
    const wrapper = makeWrapper();

    expect(wrapper).toMatchSnapshot();
  });
});
