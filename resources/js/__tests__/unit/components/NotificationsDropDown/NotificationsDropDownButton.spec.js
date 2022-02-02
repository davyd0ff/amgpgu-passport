import { shallowMount } from '@vue/test-utils';

import NotificationsDropDownButton from '@/components/NotificationsDropDown/NotificationsDropDownButton.vue';

describe('NotificationsDropDownButton', () => {
  const makeWrapper = (options = {}) => {
    return shallowMount(NotificationsDropDownButton, {
      ...options,
    });
  };

  it('render when user has unread notifications', () => {
    const wrapper = makeWrapper({ propsData: { active: false } });

    expect(wrapper).toMatchSnapshot();
  });

  it('render when user has no unread notifications', () => {
    const wrapper = makeWrapper({ propsData: { active: true } });

    expect(wrapper).toMatchSnapshot();
  });

  it('smoke render', () => {
    const wrapper = makeWrapper();

    expect(wrapper).toMatchSnapshot();
  });
});
