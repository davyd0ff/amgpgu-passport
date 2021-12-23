import actions from '@/store/notifications/actions';
import PassportAPI from '@/commands/passport';

describe('test store - notification actions', () => {
  describe('getNotifications', () => {
    it('commit has been called', async () => {
      const commit = jest.fn();
      const TEST_NOTIFICATION_TITLE = 'TEST_NOTIFICATION';
      const TEST_NOTIFICATIONS = [{ title: TEST_NOTIFICATION_TITLE }];
      PassportAPI.getNotifications = jest
        .fn()
        .mockImplementation(() => ({ data: TEST_NOTIFICATIONS }));

      await actions.getNotifications({ commit });

      expect(commit).toHaveBeenCalledWith('SET_NOTIFICATIONS', {
        notifications: [{ title: TEST_NOTIFICATION_TITLE }],
      });
      expect(PassportAPI.getNotifications).toHaveBeenCalled();
    });
  });

  describe('readNotification', () => {
    it('commit has been called', async () => {
      const commit = jest.fn();
      const TEST_NOTIFICATION_ID = 1;
      PassportAPI.readNotification = jest.fn().mockImplementation((id) => id);

      await actions.readNotification({ commit }, { id: TEST_NOTIFICATION_ID });

      expect(commit).toHaveBeenCalledWith('READ_NOTIFICATION', {
        id: TEST_NOTIFICATION_ID,
      });
      expect(PassportAPI.readNotification).toHaveBeenCalledWith(
        TEST_NOTIFICATION_ID
      );
    });
  });

  describe('readNotifications', () => {
    it('commit has been called', async () => {
      const commit = jest.fn();
      PassportAPI.readNotifications = jest.fn();

      await actions.readNotifications({ commit });

      expect(PassportAPI.readNotifications).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith('READ_NOTIFICATIONS');
    });
  });
});
