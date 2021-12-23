import { shallowMount, createLocalVue } from '@vue/test-utils';
import DialogWindow from '@/components/DialogWindow/DialogWindow.vue';

describe('DialogWindow', () => {
  const makeWrapper = (options) => {
    const localize = (str) => str;
    const localVue = createLocalVue();
    localVue.filter('localize', localize);

    return shallowMount(DialogWindow, { ...options, localVue });
  };

  it('render with slots', () => {
    const wrapper = makeWrapper({
      slots: {
        header: '<div id="test-slot-header" />',
        content: '<div id="test-slot-content" />',
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('render when prop IsOpened is truthy', () => {
    const wrapper = makeWrapper({
      propsData: {
        isOpened: true,
      },
    });

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('#dialog-window').classes()).toContain('open');
  });

  it('render when prop IsOpened is falsy', () => {
    const wrapper = makeWrapper({
      propsData: {
        isOpened: false,
      },
    });

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('#dialog-window').classes()).not.toContain('open');
  });
});
