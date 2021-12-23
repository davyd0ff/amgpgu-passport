import { shallowMount, createLocalVue } from '@vue/test-utils';
import FileDeleteButton from '@/components/Files/FileDeleteButton.vue';
import { ExplorerSync } from 'prettier/third-party';

describe('FileDeleteButton.vue', () => {
  it('render', () => {
    const wrapper = shallowMount(FileDeleteButton);

    expect(wrapper).toMatchSnapshot();
  });

  describe('press on button', () => {
    const $message = jest.fn();
    const makeWrapper = (options) =>
      shallowMount(FileDeleteButton, {
        ...options,
        mocks: { $message },
      });

    it('file was deleted', async () => {
      $message.mockReset();
      const onDeleteFile = jest.fn(() => Promise.resolve({}));
      const wrapper = makeWrapper({
        propsData: { onDeleteFile },
      });

      await wrapper.find('button').trigger('click');

      expect(onDeleteFile).toHaveBeenCalled();
      expect($message).toHaveBeenCalledWith('DELETE_FILE_FILE_WAS_DELETED');
    });

    // it('file was not deleted', () => {
    //   const $message = jest.fn();
    //   const onDeleteFile = jest.fn(() => Promise.reject({}));
    //   const wrapper = makeWrapper({
    //     propsData: { onDeleteFile },
    //     mocks: { $message },
    //   });

    //   wrapper.find('button').trigger('click');

    //   expect(onDeleteFile).toHaveBeenCalled();
    //   expect($message).not.toHaveBeenCalled();
    // });
  });
});
