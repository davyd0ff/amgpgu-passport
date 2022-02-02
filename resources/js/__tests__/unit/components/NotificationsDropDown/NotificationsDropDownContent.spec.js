import { shallowMount, createLocalVue } from '@vue/test-utils';

import NotificationsDropDownContent from '@/components/NotificationsDropDown/NotificationsDropDownContent.vue';

describe('NotificationsDropDownContent', () => {
  const $emit = jest.fn();

  const makeWrapper = (options = {}) => {
    const localVue = createLocalVue();
    localVue.filter('localize', (str) => str);

    return shallowMount(NotificationsDropDownContent, {
      localVue,
      mocks: {
        $emit,
      },
      stubs: ['router-link'],
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

  it('click on clear', () => {
    const wrapper = makeWrapper();
    const clearButton = wrapper.find('a');

    clearButton.trigger('click');

    expect($emit).toHaveBeenCalledWith('clear');
  });
});
