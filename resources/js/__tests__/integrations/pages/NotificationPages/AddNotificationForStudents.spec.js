import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';

import AddNotificationForStudent from '@/pages/NotificationPages/AddNotificationForStudents.vue';
import passport from '@/commands/passport';
import store from '@/store';
import DialogTreeSelect from '@/components/DialogTreeSelect/DialogTreeSelect.vue';

import { tree } from '@/__tests__/__fixtures__/studentTree';

jest.mock('@/commands/passport');

describe('AddNotificationForStudent.vue', () => {
  const makeWrapper = (options = {}) => {
    const localize = (str) => str;
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.filter('localize', localize);

    return mount(AddNotificationForStudent, {
      ...options,
      localVue,
      store,
      stubs: ['v-file-input'],
    });
  };

  beforeEach(() => {
    passport.getStudentsTree.mockClear();
    passport.sendNotification.mockClear();
  });

  describe('render', () => {
    it('isDialogTreeOpened is falsy', async () => {
      passport.getStudentsTree.mockImplementation(() => Promise.resolve({}));

      const wrapper = makeWrapper();

      await flushPromises();
      expect(passport.getStudentsTree).toHaveBeenCalled();
      expect(wrapper).toMatchSnapshot();
    });
    it('isDialogTreeOpened is truthy', async () => {
      passport.getStudentsTree.mockImplementation(() => Promise.resolve(tree));
      const wrapper = makeWrapper();

      await wrapper.setData({
        isDialogTreeOpened: true,
      });

      await flushPromises();
      const dialogTreeSelectWrapper = wrapper.findComponent(DialogTreeSelect);
      expect(passport.getStudentsTree).toHaveBeenCalled();
      expect(dialogTreeSelectWrapper.vm.tree).toStrictEqual({
        nodes: expect.any(Array),
      });
      expect(wrapper).toMatchSnapshot();
    });
  });

  // describe('sendNotification', () => {
  //   it('sendNotification is success', async () => {
  //     const wrapper = makeWrapper();
  //     await wrapper.setData({
  //       title: 'TEST_TITLE',
  //       message: 'TEST_MESSAGE',
  //       recipients: [
  //         { code: 'RECIPIENT_CODE_1' },
  //         { code: 'RECIPIENT_CODE_2' },
  //       ],
  //       files: [{ name: 'FILE_NAME_1' }, { name: 'FILE_NAME_2' }],
  //     });

  //     await wrapper.find('button[type=submit]').trigger('click');

  //     await flushPromises();
  //     expect(wrapper.vm.isLoading).toBeFalsy();
  //     expect(wrapper.vm.title).toBe('');
  //     expect(wrapper.vm.message).toBe('');
  //     expect(wrapper.vm.recipients).toStrictEqual([
  //       { code: 'RECIPIENT_CODE_1' },
  //       { code: 'RECIPIENT_CODE_2' },
  //     ]);
  //     expect(wrapper.vm.files).toStrictEqual([]);
  //     expect(passport.sendNotification).toHaveBeenCalledWith(
  //       expect.any(Object),
  //       {
  //         notification: {
  //           title: 'TEST_TITLE',
  //           message: 'TEST_MESSAGE',
  //           recipients: [
  //             { code: 'RECIPIENT_CODE_1' },
  //             { code: 'RECIPIENT_CODE_2' },
  //           ],
  //           files: [{ name: 'FILE_NAME_1' }, { name: 'FILE_NAME_2' }],
  //         },
  //         context: 'students',
  //       }
  //     );
  //   });
  //   it('sendNotification is failure', async () => {
  //     passport.sendNotification.mockImplementation(() => Promise.reject({}));
  //     const wrapper = makeWrapper();
  //     await wrapper.setData({
  //       title: 'TEST_TITLE',
  //       message: 'TEST_MESSAGE',
  //       recipients: [
  //         { code: 'RECIPIENT_CODE_1' },
  //         { code: 'RECIPIENT_CODE_2' },
  //       ],
  //       files: [{ name: 'FILE_NAME_1' }, { name: 'FILE_NAME_2' }],
  //     });

  //     await wrapper.find('button[type=submit]').trigger('click');

  //     await flushPromises();
  //     expect(wrapper.vm.isLoading).toBeFalsy();
  //     expect(wrapper.vm.title).toBe('TEST_TITLE');
  //     expect(wrapper.vm.message).toBe('TEST_MESSAGE');
  //     expect(wrapper.vm.recipients).toStrictEqual([
  //       { code: 'RECIPIENT_CODE_1' },
  //       { code: 'RECIPIENT_CODE_2' },
  //     ]);
  //     expect(wrapper.vm.files).toStrictEqual([
  //       { name: 'FILE_NAME_1' },
  //       { name: 'FILE_NAME_2' },
  //     ]);
  //     expect(passport.sendNotification).toHaveBeenCalledWith(
  //       expect.any(Object),
  //       {
  //         notification: {
  //           title: 'TEST_TITLE',
  //           message: 'TEST_MESSAGE',
  //           recipients: [
  //             { code: 'RECIPIENT_CODE_1' },
  //             { code: 'RECIPIENT_CODE_2' },
  //           ],
  //           files: [{ name: 'FILE_NAME_1' }, { name: 'FILE_NAME_2' }],
  //         },
  //         context: 'students',
  //       }
  //     );
  //   });
  // });
});
