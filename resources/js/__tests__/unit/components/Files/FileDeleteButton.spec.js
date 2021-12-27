import { shallowMount, createLocalVue } from '@vue/test-utils';
import FileDeleteButton from '@/components/Files/FileDeleteButton.vue';

describe('FileDeleteButton.vue', () => {
  it('render', () => {
    const wrapper = shallowMount(FileDeleteButton);

    expect(wrapper).toMatchSnapshot();
  });

  describe('press on button', () => {
    const makeWrapper = (options = {}) =>
      shallowMount(FileDeleteButton, {
        ...options,
      });

    it('file was deleted', () => {
      const wrapper = makeWrapper();

      wrapper.find('button').trigger('click');

      expect(wrapper.emitted()['delete-file']).toBeTruthy();
    });
  });
});
