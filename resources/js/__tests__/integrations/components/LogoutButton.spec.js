import { shallowMount, createLocalVue } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Vuex from 'vuex';

import store from '@/store';
import passport from '@/commands/passport';

import LogoutButton from '@/components/Sidebar/LogoutButton';

jest.mock('@/commands/passport');

describe('LogoutButton', () => {
  const makeWrapper = (options = {}) => {
    const localVue = createLocalVue();
    localVue.use(Vuex);

    return shallowMount(LogoutButton, {
      localVue,
      store,
      ...options,
    });
  };

  beforeEach(() => {
    window.localStorage.__proto__.getItem = jest.fn();
    window.localStorage.__proto__.saveItem = jest.fn();
    window.localStorage.__proto__.removeItem = jest.fn();

    passport.logout.mockClear();
  });

  it('logout render', () => {
    const wrapper = makeWrapper();

    expect(wrapper).toMatchSnapshot();
  });
  it('logout is success', async () => {
    passport.logout.mockImplementation(() =>
      Promise.resolve({
        code: 204,
      })
    );
    const wrapper = makeWrapper();

    wrapper.find('a').trigger('click');

    await flushPromises();
    expect(passport.logout).toHaveBeenCalled();
    expect(window.localStorage.__proto__.removeItem).toHaveBeenCalledWith(
      'token'
    );
  });
  it('logout is failure', async () => {
    passport.logout.mockImplementation(() => Promise.reject({ code: 500 }));
    const $error = jest.fn();
    const wrapper = makeWrapper({
      mocks: { $error },
    });

    wrapper.find('a').trigger('click');

    await flushPromises();
    expect(passport.logout).toHaveBeenCalled();
    expect($error).toHaveBeenCalled();
    expect(window.localStorage.__proto__.removeItem).not.toHaveBeenCalled();
  });
});
