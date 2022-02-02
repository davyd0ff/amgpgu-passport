import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';

import notificationModule from '@/store/notifications';
import passport from '@/commands/passport';
import * as fixture from '@/__tests__/__fixtures__/notifications';

import NotificationsDropDown from '@/components/NotificationsDropDown/NotificationsDropDown.vue';
import { integer } from 'vuelidate/lib/validators';

jest.mock('materialize-css');
jest.mock('@/commands/passport');

describe('NotificationsDropDown', () => {
  const $router = {
    push: jest.fn(),
  };

  const makeWrapper = (options = {}) => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.filter('localize', (str) => str);

    const store = new Vuex.Store({
      ...notificationModule,
      state: {
        all: [...fixture.notifications],
      },
    });

    return mount(NotificationsDropDown, {
      localVue,
      store,
      mocks: {
        $router,
      },
      stubs: ['router-link'],
      ...options,
    });
  };

  beforeEach(() => {
    $router.push.mockClear();
    passport.readNotification.mockClear();
    passport.readNotifications.mockClear();
  });

  describe('render', () => {
    it('user has unread notifications', () => {
      const wrapper = makeWrapper();

      expect(wrapper).toMatchSnapshot();
    });
    it('user has no unread notifications', () => {
      const store = new Vuex.Store({
        ...notificationModule,
        state: { all: [] },
      });

      const wrapper = makeWrapper({ store });

      expect(wrapper).toMatchSnapshot();
    });
  });

  it('onReadNotification', () => {
    const wrapper = makeWrapper();
    const readNotificationButton = wrapper.find('.read-notification');

    readNotificationButton.trigger('click');

    expect(passport.readNotification).toHaveBeenCalledWith(expect.any(Number));
  });

  it('onOpenNotification', () => {
    const wrapper = makeWrapper();
    const openNotificationButton = wrapper.find('.open-notification');

    openNotificationButton.trigger('click');
    $router.push.mock.calls[0][1]();

    expect($router.push).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Function)
    );
    expect(passport.readNotification).toHaveBeenCalledWith(expect.any(Number));
  });

  it('onClearNotifications', () => {
    const wrapper = makeWrapper();
    const clearNotificationsButton = wrapper.find('.clear-notifications');

    clearNotificationsButton.trigger('click');

    expect(passport.readNotifications).toHaveBeenCalled();
  });
});
