import { shallowMount, createLocalVue } from '@vue/test-utils';

import NotificationsDropDownEmptyCard from '@/components/NotificationsDropDown/NotificationsDropDownEmptyCard.vue';

describe('NotificationsDropDownEmptyCard', () => {
  const makeWrapper = (options = {}) => {
    const localVue = createLocalVue();
    localVue.filter('localize', (str) => str);

    return shallowMount(NotificationsDropDownEmptyCard, {
      localVue,
      ...options,
    });
  };

  it('render', () => {
    const wrapper = makeWrapper();

    expect(wrapper).toMatchSnapshot();
  });
});
