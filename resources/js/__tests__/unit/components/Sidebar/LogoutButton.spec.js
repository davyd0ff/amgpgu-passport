import { shallowMount, createLocalVue } from '@vue/test-utils';
import LogoutButton from '@/components/Sidebar/LogoutButton.vue';
import Vuex from 'vuex';
import user from '@/store/user';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('LogoutButton.vue', () => {
  let store;
  const createWrapper = () => {
    return shallowMount(LogoutButton, { store, localVue });
  };

  beforeEach(() => {
    user.actions.logout = jest.fn();

    store = new Vuex.Store({
      modules: {
        user,
      },
    });
  });

  it('render', () => {
    const wrapper = createWrapper();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('logout was called when to press on the button', () => {
    const wrapper = createWrapper();
    const logoutButton = wrapper.find('a');

    logoutButton.trigger('click');

    expect(user.actions.logout).toBeCalled();
  });
});
