import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import UserInfo from '@/components/Sidebar/UserInfo.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('UserInfo.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        user: {
          lastname: 'Testov',
          firstname: 'Test',
          middlename: 'Testovich',
          email: 'test@test.ru',
        },
      },
      getters: {
        user: (state) => state.user,
      },
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
