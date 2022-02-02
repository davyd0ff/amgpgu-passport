import { shallowMount, createLocalVue } from '@vue/test-utils';

import NotificationsDropDownCard from '@/components/NotificationsDropDown/NotificationsDropDownCard.vue';

describe('NotificationsDropDownCard', () => {
  const notification = {
    id: 'TEST ID',
    title: 'TEST TITLE',
    message: 'TEST MESSAGE',
  };

  const $emit = jest.fn();

  const makeWrapper = (options = {}) => {
    const localVue = createLocalVue();
    localVue.filter('localize', (str) => str);

    return shallowMount(NotificationsDropDownCard, {
      localVue,
      propsData: {
        notification,
      },
      mocks: {
        $emit,
      },
      ...options,
    });
  };

  beforeEach(() => {
    $emit.mockClear();
  });

  it('render', () => {
    const wrapper = makeWrapper();

    expect(wrapper).toMatchSnapshot();
  });

  it('emit when click on open-button', () => {
    const wrapper = makeWrapper();
    const openButton = wrapper.find('.open-notification');

    openButton.trigger('click');

    expect($emit).toHaveBeenCalledWith('open', 'TEST ID');
  });

  it('emit when click on read-button', () => {
    const wrapper = makeWrapper();
    const readButton = wrapper.find('.read-notification');

    readButton.trigger('click');

    expect($emit).toHaveBeenCalledWith('read', 'TEST ID');
  });
});
