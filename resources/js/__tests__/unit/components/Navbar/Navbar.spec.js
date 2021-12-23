import { shallowMount, createLocalVue } from '@vue/test-utils';
import Navbar from '@/components/Navbar/Navbar.vue';

const localize = (str) => str;
const localVue = createLocalVue();
localVue.filter('localize', localize);

describe('Navbar.vue', () => {
  it('render', () => {
    const $route = {
      meta: {
        title: 'TEST TITLE',
      },
    };

    const wrapper = shallowMount(Navbar, {
      localVue,
      mocks: { $route },
    });

    expect(wrapper.element).toMatchSnapshot();
    // expect(wrapper.find('.brand-logo').innerText).toBe('TEST TITLE');
  });
});
