import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';
import Login from '@/pages/Login.vue';
import { getExtensionDescription } from 'prettier/third-party';

describe('Page/Login.vue', () => {
  const $router = {
    push: jest.fn(),
    replace: jest.fn(),
  };
  const $route = {};
  const action_login = jest.fn();
  const $error = jest.fn();

  const createWrapper = (options = {}) => {
    const localize = (str) => str;
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.filter('localize', localize);

    const store = new Vuex.Store({
      actions: {
        login: action_login,
      },
    });

    return shallowMount(Login, {
      localVue,
      store,
      mocks: { $router, $route, $error },
      ...options,
    });
  };

  beforeEach(() => {
    $router.push.mockClear();
    $router.replace.mockClear();
    $error.mockClear();
    action_login.mockClear();
  });

  it('render', () => {
    const wrapper = createWrapper();

    expect(wrapper).toMatchSnapshot();
  });

  it('submit form and loggin is success', async () => {
    action_login.mockImplementation(() =>
      Promise.resolve({ data: { token: { access: 'TEST_ACCESS_TOKEN' } } })
    );
    const wrapper = createWrapper();
    await wrapper.setData({
      username: 'TEST_USERNAME',
      password: 'TEST_PASSWORD',
    });

    await wrapper.find('form').trigger('submit');

    await flushPromises();
    expect(action_login).toHaveBeenCalledWith(expect.any(Object), {
      username: 'TEST_USERNAME',
      password: 'TEST_PASSWORD',
    });
    expect($router.push).not.toHaveBeenCalled();
    expect($error).not.toHaveBeenCalled();
    expect($router.replace).toHaveBeenCalledWith('/');
  });

  it('submit form and loggin is failure', async () => {
    action_login.mockImplementation(() =>
      Promise.reject({ message: 'TEST_ERROR' })
    );
    const wrapper = createWrapper();
    await wrapper.setData({
      username: 'TEST_USERNAME',
      password: 'TEST_PASSWORD',
    });

    await wrapper.find('form').trigger('submit');

    await flushPromises();
    expect(action_login).toHaveBeenCalledWith(expect.any(Object), {
      username: 'TEST_USERNAME',
      password: 'TEST_PASSWORD',
    });
    expect($router.push).not.toHaveBeenCalled();
    expect($router.replace).not.toHaveBeenCalled();
    expect($error).toHaveBeenCalledWith({ message: 'TEST_ERROR' });
  });
});
