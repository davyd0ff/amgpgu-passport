import getters from '@/store/notifications/getters';

describe('store/notifications/getters', () => {
  it('getAllNotifications', () => {
    const state = {
      all: [
        {
          title: 'TEST NOTIFICATION TITLE 1',
          isReaded: false,
          isMeantToMe: true,
        },
        {
          title: 'TEST NOTIFICATION TITLE 2',
          isReaded: true,
          isMeantToMe: true,
        },
        {
          title: 'TEST NOTIFICATION TITLE 3',
          isReaded: false,
          isMeantToMe: true,
        },
        {
          title: 'TEST NOTIFICATION TITLE 4',
          isReaded: false,
          isMeantToMe: true,
        },
      ],
    };

    const result = getters.getAllNotifications(state);

    expect(result.length).toBe(4);
    expect(result.map((notification) => notification.title)).toStrictEqual([
      'TEST NOTIFICATION TITLE 1',
      'TEST NOTIFICATION TITLE 2',
      'TEST NOTIFICATION TITLE 3',
      'TEST NOTIFICATION TITLE 4',
    ]);
  });
  it('getNotReadedNotifications', () => {
    const state = {
      all: [
        {
          title: 'TEST NOTIFICATION TITLE 1',
          isReaded: false,
          isMeantToMe: true,
        },
        {
          title: 'TEST NOTIFICATION TITLE 2',
          isReaded: true,
          isMeantToMe: true,
        },
        {
          title: 'TEST NOTIFICATION TITLE 3',
          isReaded: false,
          isMeantToMe: true,
        },
        {
          title: 'TEST NOTIFICATION TITLE 4',
          isReaded: false,
          isMeantToMe: true,
        },
      ],
    };

    const result = getters.getNotReadedNotifications(state)(3);

    expect(result.length).toBe(3);
    expect(result.map((notification) => notification.title)).toStrictEqual([
      'TEST NOTIFICATION TITLE 1',
      'TEST NOTIFICATION TITLE 3',
      'TEST NOTIFICATION TITLE 4',
    ]);
  });
  it('hasNotReadedNotifications', () => {
    const state = {
      all: [
        {
          title: 'TEST NOTIFICATION TITLE',
          isReaded: false,
          isMeantToMe: true,
        },
      ],
    };

    const result = getters.hasNotReadedNotifications(state);

    expect(result).toBeTruthy();
  });

  it('getNotification', () => {
    const state = {
      all: [
        {
          id: 1,
          title: 'TEST NOTIFICATION TITLE',
        },
      ],
    };

    const result = getters.getNotification(state)(1);

    expect(result).toStrictEqual({
      id: 1,
      title: 'TEST NOTIFICATION TITLE',
    });
  });

  describe('smoke', () => {
    it('getNotReadedNotifications', () => {
      const state = { all: [] };

      const result = getters.getNotReadedNotifications(state)(3);

      expect(result).toStrictEqual([]);
    });
    it('hasNotReadedNotifications', () => {
      const state = { all: [] };

      const result = getters.hasNotReadedNotifications(state);

      expect(result).toBeFalsy();
    });
    it('getNotification', () => {
      const state = { all: [] };

      const result = getters.getNotification(state)(1);

      expect(result).toStrictEqual({});
    });
  });
});
