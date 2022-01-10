import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';

import passport from '@/commands/passport';
import store from '@/store';
import DefaultFileUploadPage from '@/pages/DefaultFileUploadPage.vue';
import FileUploadForm from '@/components/Files/FileUploadForm.vue';

import { files } from '@/__tests__/__fixtures__/files';

jest.mock('@/commands/passport');

describe('DefaultFileUploadPage.vue', () => {
  const context = 'TEST';
  const $error = jest.fn();
  const $message = jest.fn();

  beforeEach(() => {
    passport.uploadFiles.mockClear();
    passport.getFiles.mockClear();
    $error.mockClear();
    $message.mockClear();
  });

  const makeWrapper = (options = {}) => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.filter('localize', (str) => str);

    return mount(DefaultFileUploadPage, {
      propsData: {
        context,
        ...(options.propsData ?? {}),
      },
      localVue,
      store,
      stubs: ['v-file-input'],
      mocks: {
        $error,
        $message,
      },
      ...options,
    });
  };

  it('render, when backend not returns files', async () => {
    passport.getFiles.mockImplementation(() => Promise.resolve([]));

    const wrapper = makeWrapper({});

    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });

  it('render, when backend returns error', async () => {
    passport.getFiles.mockImplementation(() =>
      Promise.reject({ code: 500, data: 'test' })
    );

    const wrapper = makeWrapper({});

    await flushPromises();
    expect($error).toHaveBeenCalledWith({
      code: 500,
      data: 'test',
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('render, when backend returns files', async () => {
    passport.getFiles.mockImplementation(() => Promise.resolve(files));

    const wrapper = makeWrapper({});

    await flushPromises();
    expect(store.state.files[context]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          type: expect.any(String),
          created: expect.any(Number),
          url: expect.any(String),
        }),
      ])
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('uploadButton had been clicked and files uploaded', async () => {
    passport.uploadFiles.mockImplementation(() =>
      Promise.resolve([{ id: 'TEST_FILE_ID', name: 'TEST_FILE_NAME' }])
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
    expect(store.state.files[context]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'TEST_FILE_ID',
          name: 'TEST_FILE_NAME',
        }),
      ])
    );
    expect(childWrapper.vm.files).toStrictEqual([]);
  });

  it('uploadButton had been clicked and files did not upload', async () => {
    passport.uploadFiles.mockImplementation(() =>
      Promise.reject({ code: 401, data: 'test' })
    );
    const wrapper = makeWrapper();
    const childWrapper = wrapper.getComponent(FileUploadForm);

    await childWrapper.setData({ files: ['TEST_CHILD_FILE'] });
    await childWrapper.find('.btn').trigger('click');

    await flushPromises();
    expect(passport.uploadFiles).toHaveBeenCalledWith(
      ['TEST_CHILD_FILE'],
      context,
      expect.any(Function)
    );
    expect($error).toHaveBeenCalledWith({ code: 401, data: 'test' });
    expect(childWrapper.vm.files).toStrictEqual(['TEST_CHILD_FILE']);
  });

  it('delete a file, and the file has been deleted', async () => {
    passport.getFiles.mockImplementation(() => Promise.resolve(files));
    passport.deleteFile.mockImplementation(() =>
      Promise.resolve({ id: 'TEST' })
    );
    const wrapper = makeWrapper();

    wrapper.find('.btn-danger').trigger('click');

    await flushPromises();
    expect(passport.deleteFile).toHaveBeenCalledWith(expect.any(Number));
    expect($message).toHaveBeenCalledWith('DELETE_FILE_FILE_WAS_DELETED');
    expect($error).not.toHaveBeenCalled();
    expect(store.state.files[context]).toHaveLength(files.length - 1);
  });

  it('delete a file, and the file has not been deleted', async () => {
    passport.deleteFile.mockImplementation(() =>
      Promise.reject({ code: 401, data: 'test' })
    );
    const wrapper = makeWrapper();

    wrapper.find('.btn-danger').trigger('click');

    await flushPromises();
    expect(passport.deleteFile).toHaveBeenCalledWith(expect.any(Number));
    expect($message).not.toHaveBeenCalled();
    expect($error).toHaveBeenCalledWith({ code: 401, data: 'test' });
    expect(store.state.files[context]).toHaveLength(files.length);
  });
});
