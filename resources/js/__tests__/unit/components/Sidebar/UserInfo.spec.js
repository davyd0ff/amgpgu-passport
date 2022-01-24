import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import UserInfo from '@/components/Sidebar/UserInfo.vue';
import getters from '@/store/user/getters';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('UserInfo.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        info: {
          lastname: 'Testov',
          firstname: 'Test',
          middlename: 'Testovich',
          email: 'test@test.ru',
        },
      },
      getters,
    });
  });

  it('render', () => {
    const wrapper = shallowMount(UserInfo, {
      store,
      localVue,
      stubs: ['router-link'],
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
