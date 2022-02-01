import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';
import LogoutButton from '@/components/Sidebar/LogoutButton.vue';
import auth from '@/store/auth';

describe('LogoutButton.vue', () => {
  auth.actions.logout = jest.fn();
  const $router = { push: jest.fn() };
  const $error = jest.fn();

  const createWrapper = (options = {}) => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    const store = new Vuex.Store({
      ...auth,
    });

    return shallowMount(LogoutButton, {
      localVue,
      store,
      mocks: {
        $router,
        $error,
      },
      ...options,
    });
  };

  beforeEach(() => {
    auth.actions.logout.mockClear();
    $router.push.mockClear();
    $error.mockClear();
  });

  it('render', () => {
    const wrapper = createWrapper();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('press on the button and successful logout', async () => {
    auth.actions.logout.mockImplementation(() => Promise.resolve({}));
    const wrapper = createWrapper();
    const logoutButton = wrapper.find('a');

    logoutButton.trigger('click');

    await flushPromises();
    expect(auth.actions.logout).toHaveBeenCalled();
    expect($router.push).toHaveBeenCalledWith('/login', expect.any(Function));
  });

  it('press on the button and failed logout', async () => {
    auth.actions.logout.mockImplementation(() =>
      Promise.reject({ code: 'TEST ERROR' })
    );
    const wrapper = createWrapper();
    const logoutButton = wrapper.find('a');

    logoutButton.trigger('click');

    await flushPromises();
    expect(auth.actions.logout).toHaveBeenCalled();
    expect($router.push).not.toHaveBeenCalled();
    expect($error).toHaveBeenCalledWith({
      code: 'TEST ERROR',
    });
  });
});
