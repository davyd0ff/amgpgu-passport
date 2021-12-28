import { shallowMount, createLocalVue, createWrapper } from '@vue/test-utils';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';
import App from '@/App.vue';
import Fragment from 'vue-fragment';
// import user from '@/store/user';
// import student from '@/store/student';
// import notifications from '@/store/notifications';

describe('App.vue', () => {
  const action_getUserMenu = jest.fn();
  const action_getUserData = jest.fn(() => Promise.resolve({}));
  const action_uploadAvatar = jest.fn(() => Promise.resolve({}));
  const action_getStudentInfo = jest.fn(() => Promise.resolve({}));
  const action_getNotifications = jest.fn(() => Promise.resolve({}));

  const makeWrapper = (options = {}) => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Fragment.Plugin);

    const store = new Vuex.Store({
      getters: {
        userIsAuthenticated: (_) => true,
      },

      actions: {
        getUserData: action_getUserData,
        getUserMenu: action_getUserMenu,
        uploadAvatar: action_uploadAvatar,
        getStudentInfo: action_getStudentInfo,
        getNotifications: action_getNotifications,
      },
    });

    return shallowMount(App, {
      store,
      localVue,
      stubs: ['router-view'],
      ...options,
    });
  };

  beforeEach(() => {
    action_getUserData.mockClear();
    action_getUserMenu.mockClear();
    action_uploadAvatar.mockClear();
    action_getStudentInfo.mockClear();
    action_getNotifications.mockClear();
  });

  it('called actions after mounted', async () => {
    const wrapper = makeWrapper();

    await flushPromises();
    expect(action_getUserData).toHaveBeenCalledTimes(1);
    expect(action_getUserMenu).toHaveBeenCalledTimes(1);
    expect(action_getStudentInfo).toHaveBeenCalledTimes(1);
    expect(action_getNotifications).toHaveBeenCalledTimes(1);

    expect(action_uploadAvatar).not.toHaveBeenCalled();
  });

  it('actions have worked as success and isLoading is falsy', async () => {
    const wrapper = makeWrapper();

    await flushPromises();
    expect(wrapper.vm.isLoading).toBeFalsy();
  });

  it('some action has worked as filure and isLoading is falsy', async () => {
    action_getUserMenu.mockImplementation(() => Promise.reject({ code: 500 }));

    const wrapper = makeWrapper();

    await flushPromises();
    expect(wrapper.vm.isLoading).toBeFalsy();
  });
});
