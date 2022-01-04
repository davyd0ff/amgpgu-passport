import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';
import AddNotificationForStudent from '@/pages/NotificationPages/AddNotificationForStudents.vue';
import { tree } from '@/__tests__/__fixtures__/studentTree';

describe('AddNotificationForStudent.vue', () => {
  const action_getStudentsTree = jest.fn();
  const action_sendNotification = jest.fn();

  const makeWrapper = (options = {}) => {
    const localize = (str) => str;
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.filter('localize', localize);

    const store = new Vuex.Store({
      actions: {
        getStudentsTree: action_getStudentsTree,
        sendNotification: action_sendNotification,
      },
    });

    return mount(AddNotificationForStudent, {
      ...options,
      localVue,
      store,
      stubs: ['v-file-input'],
    });
  };

  beforeEach(() => {
    action_getStudentsTree.mockClear();
    action_sendNotification.mockClear();
  });

  describe('render', () => {
    it('isDialogTreeOpened is falsy', () => {
      const wrapper = makeWrapper();

      expect(action_getStudentsTree).toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
    it('isDialogTreeOpened is truthy', async () => {
      action_getStudentsTree.mockImplementation(() => Promise.resolve(tree));
      const wrapper = makeWrapper();

      await wrapper.setData({
        isDialogTreeOpened: true,
      });

      await flushPromises();
      expect(action_getStudentsTree).toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('sendNotification', () => {
    it('sendNotification is success', async () => {
      const wrapper = makeWrapper();
      await wrapper.setData({
        title: 'TEST_TITLE',
        message: 'TEST_MESSAGE',
        recipients: [
          { code: 'RECIPIENT_CODE_1' },
          { code: 'RECIPIENT_CODE_2' },
        ],
        files: [{ name: 'FILE_NAME_1' }, { name: 'FILE_NAME_2' }],
      });

      await wrapper.find('button[type=submit]').trigger('click');

      await flushPromises();
      expect(wrapper.vm.isLoading).toBeFalsy();
      expect(wrapper.vm.title).toBe('');
      expect(wrapper.vm.message).toBe('');
      expect(wrapper.vm.recipients).toStrictEqual([
        { code: 'RECIPIENT_CODE_1' },
        { code: 'RECIPIENT_CODE_2' },
      ]);
      expect(wrapper.vm.files).toStrictEqual([]);
      expect(action_sendNotification).toHaveBeenCalledWith(expect.any(Object), {
        notification: {
          title: 'TEST_TITLE',
          message: 'TEST_MESSAGE',
          recipients: [
            { code: 'RECIPIENT_CODE_1' },
            { code: 'RECIPIENT_CODE_2' },
          ],
          files: [{ name: 'FILE_NAME_1' }, { name: 'FILE_NAME_2' }],
        },
        context: 'students',
      });
    });
    it('sendNotification is failure', async () => {
      action_sendNotification.mockImplementation(() => Promise.reject({}));
      const wrapper = makeWrapper();
      await wrapper.setData({
        title: 'TEST_TITLE',
        message: 'TEST_MESSAGE',
        recipients: [
          { code: 'RECIPIENT_CODE_1' },
          { code: 'RECIPIENT_CODE_2' },
        ],
        files: [{ name: 'FILE_NAME_1' }, { name: 'FILE_NAME_2' }],
      });

      await wrapper.find('button[type=submit]').trigger('click');

      await flushPromises();
      expect(wrapper.vm.isLoading).toBeFalsy();
      expect(wrapper.vm.title).toBe('TEST_TITLE');
      expect(wrapper.vm.message).toBe('TEST_MESSAGE');
      expect(wrapper.vm.recipients).toStrictEqual([
        { code: 'RECIPIENT_CODE_1' },
        { code: 'RECIPIENT_CODE_2' },
      ]);
      expect(wrapper.vm.files).toStrictEqual([
        { name: 'FILE_NAME_1' },
        { name: 'FILE_NAME_2' },
      ]);
      expect(action_sendNotification).toHaveBeenCalledWith(expect.any(Object), {
        notification: {
          title: 'TEST_TITLE',
          message: 'TEST_MESSAGE',
          recipients: [
            { code: 'RECIPIENT_CODE_1' },
            { code: 'RECIPIENT_CODE_2' },
          ],
          files: [{ name: 'FILE_NAME_1' }, { name: 'FILE_NAME_2' }],
        },
        context: 'students',
      });
    });
  });
});
