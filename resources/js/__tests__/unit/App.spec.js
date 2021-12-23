import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import App from '@/App.vue';
import Fragment from 'vue-fragment';
import user from '@/store/user';
import student from '@/store/student';
import notifications from '@/store/notifications';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Fragment.Plugin);

describe('App.vue', () => {
  let store;

  beforeEach(() => {
    user.actions.getUserData = jest.fn();
    user.actions.getUserMenu = jest.fn();
    user.actions.uploadAvatar = jest.fn();
    student.actions.getStudentInfo = jest.fn();
    notifications.actions.getNotifications = jest.fn();

    store = new Vuex.Store({
      modules: {
        user,
        student,
        notifications,
      },
    });
  });

  it('called actions after mounted', () => {
    const wrapper = shallowMount(App, {
      store,
      localVue,
      stubs: ['router-view'],
    });

    expect(user.actions.getUserData).toHaveBeenCalledTimes(1);
    expect(user.actions.getUserMenu).toHaveBeenCalledTimes(1);
    expect(student.actions.getStudentInfo).toHaveBeenCalledTimes(1);
    expect(notifications.actions.getNotifications).toHaveBeenCalledTimes(1);

    expect(user.actions.uploadAvatar).not.toHaveBeenCalled();
  });
});
