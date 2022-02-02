import mutations from '@/store/notifications/mutations';

describe('test store - notifications mutations', () => {
  it('SET_NOTIFICATIONS', () => {
    const state = {};
    const TEST_NOTIFICATION_TITLE = 'TEST_NOTIFICATION_TITLE';
    const notifications = [{ title: TEST_NOTIFICATION_TITLE }];

    mutations.SET_NOTIFICATIONS(state, { notifications });

    expect(notifications.length).toBe(1);
    expect(state.all.length).toBe(1);
    expect(state).toStrictEqual({
      all: [{ title: TEST_NOTIFICATION_TITLE }],
    });
  });
});
