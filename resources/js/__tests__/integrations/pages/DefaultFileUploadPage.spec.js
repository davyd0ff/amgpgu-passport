import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';
import passport from '@/commands/passport';
import DefaultFileUploadPage from '@/pages/DefaultFileUploadPage.vue';
import FileUploadForm from '@/components/Files/FileUploadForm.vue';
import { files } from '@/__tests__/__fixtures__/files';

jest.mock('@/commands/passport');

// todo testing: замокать плагин $error и $message

describe('DefaultFileUploadPage.vue', () => {
  const getter_files = jest.fn(() => files);
  const action_getFiles = jest.fn();
  const action_deleteFile = jest.fn();
  const action_attachFiles = jest.fn();
  const context = 'TEST';

  beforeEach(() => {
    getter_files.mockClear();
    action_getFiles.mockClear();
    action_deleteFile.mockClear();
    action_attachFiles.mockClear();
    passport.uploadFiles.mockClear();
  });

  const makeWrapper = (options = {}) => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.filter('localize', (str) => str);

    const store = new Vuex.Store({
      state: {},
      getters: {
        files: (_) => getter_files,
      },
      actions: {
        getFiles: action_getFiles,
        deleteFile: action_deleteFile,
        attachFiles: action_attachFiles,
      },
    });

    return mount(DefaultFileUploadPage, {
      ...options,
      propsData: {
        context,
        ...(options.propsData ?? {}),
      },
      localVue,
      store,
      stubs: ['v-file-input'],
    });
  };

  it('render', async () => {
    const wrapper = makeWrapper({});

    expect(wrapper).toMatchSnapshot();
  });

  it('download files on mounted', () => {
    const wrapper = makeWrapper();

    expect(action_getFiles).toHaveBeenCalledWith(expect.any(Object), {
      context,
    });
  });

  it('uploadButton clicked and files have been uploaded', async () => {
    passport.uploadFiles.mockImplementation(() =>
      Promise.resolve({
        data: [{ id: 'TEST_FILE_ID', name: 'TEST_FILE_NAME' }],
      })
    );
    const wrapper = makeWrapper({});
    const childWrapper = wrapper.getComponent(FileUploadForm);

    await childWrapper.setData({ files: ['TEST_CHILD_FILE'] });
    await childWrapper.find('.btn').trigger('click');

    await flushPromises();
    expect(passport.uploadFiles).toHaveBeenCalledWith(
      ['TEST_CHILD_FILE'],
      context,
      expect.any(Function)
    );
    expect(action_attachFiles).toHaveBeenCalledWith(expect.any(Object), {
      context,
      files: [{ id: 'TEST_FILE_ID', name: 'TEST_FILE_NAME' }],
    });
    expect(childWrapper.vm.files).toStrictEqual([]);
  });

  it('uploadButton clicked and files have not been  uploaded', async () => {
    passport.uploadFiles.mockImplementation(() =>
      Promise.reject({
        code: 401,
      })
    );
    const $error = jest.fn();
    const wrapper = makeWrapper({ mocks: { $error } });
    const childWrapper = wrapper.getComponent(FileUploadForm);

    await childWrapper.setData({ files: ['TEST_CHILD_FILE'] });
    await childWrapper.find('.btn').trigger('click');

    await flushPromises();
    expect(passport.uploadFiles).toHaveBeenCalledWith(
      ['TEST_CHILD_FILE'],
      context,
      expect.any(Function)
    );
    expect(action_attachFiles).not.toHaveBeenCalled();
    expect($error).toHaveBeenCalled();
    expect(childWrapper.vm.files).toStrictEqual(['TEST_CHILD_FILE']);
  });

  it('delete a file and this file has been deleted', async () => {
    action_deleteFile.mockImplementation(() => Promise.resolve({}));
    const $message = jest.fn();
    const $error = jest.fn();
    const wrapper = makeWrapper({ mocks: { $message, $error } });

    wrapper.find('.btn-danger').trigger('click');

    await flushPromises();
    expect(action_deleteFile).toHaveBeenCalledWith(expect.any(Object), {
      fileId: expect.any(Number),
    });
    expect($message).toHaveBeenCalledWith('DELETE_FILE_FILE_WAS_DELETED');
    expect($error).not.toHaveBeenCalled();
  });

  it('delete a file and this file has not been deleted', async () => {
    action_deleteFile.mockImplementation(() => Promise.reject({}));
    const $message = jest.fn();
    const $error = jest.fn();
    const wrapper = makeWrapper({ mocks: { $message, $error } });

    wrapper.find('.btn-danger').trigger('click');

    await flushPromises();
    expect(action_deleteFile).toHaveBeenCalledWith(expect.any(Object), {
      fileId: expect.any(Number),
    });
    expect($message).not.toHaveBeenCalled();
    expect($error).toHaveBeenCalled();
  });
});
