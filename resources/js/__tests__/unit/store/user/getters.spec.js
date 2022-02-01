import getters from '@/store/user/getters.js';

describe('store/user/getters', () => {
  const state = {
    info: { title: 'TEST' },
    avatar: 'some/url/for/avatar.jpg',
    menu: {
      listener: [{ title: 'LISTENER MENU TEST' }],
      admin: [{ title: 'ADMIN MENU TEST' }],
      student: [{ title: 'STUDENT MENU TEST' }],
    },
  };
  it('userInfo has returned', () => {
    const userInfo = getters.userInfo(state);

    expect(userInfo).toStrictEqual({
      title: 'TEST',
    });
  });
  it('avatar has returned', () => {
    const urlAvatar = getters.avatar(state);

    expect(urlAvatar).toBe('some/url/for/avatar.jpg');
  });
  it('listenerMenu has returned', () => {
    const listenerMenu = getters.listenerMenu(state);

    expect(listenerMenu).toStrictEqual([{ title: 'LISTENER MENU TEST' }]);
  });
  it('adminMenu has returned', () => {
    const adminMenu = getters.adminMenu(state);

    expect(adminMenu).toStrictEqual([{ title: 'ADMIN MENU TEST' }]);
  });
  it('studentMenu has returned', () => {
    const studentMenu = getters.studentMenu(state);

    expect(studentMenu).toStrictEqual([{ title: 'STUDENT MENU TEST' }]);
  });

  describe('smoke', () => {
    const state = {};

    it('userInfo is undefined', () => {
      const userInfo = getters.userInfo(state);

      expect(userInfo).toStrictEqual({});
    });
    it('avatar is undefined', () => {
      const avatar = getters.avatar(state);

      expect(avatar).toBe('');
    });
    it('menu-listener is undefined', () => {
      const state = {
        menu: {},
      };

      const listenerMenu = getters.listenerMenu(state);

      expect(listenerMenu).toStrictEqual([]);
    });
    it('menu-admin is undefined', () => {
      const state = {
        menu: {},
      };

      const adminMenu = getters.adminMenu(state);

      expect(adminMenu).toStrictEqual([]);
    });
    it('menu-student is undefined', () => {
      const state = {
        menu: {},
      };

      const studentMenu = getters.studentMenu(state);

      expect(studentMenu).toStrictEqual([]);
    });
  });
});
