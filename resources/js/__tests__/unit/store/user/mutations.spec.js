import mutations from '@/store/user/mutations';

describe('test user mutations', () => {
  it('SET_USER', () => {
    const state = {
      info: {},
    };
    const user = { name: 'TEST' };

    mutations.SET_USER(state, { user });

    expect(state.info).toStrictEqual(user);
  });

  it('SET_AVATAR', () => {
    const state = {};
    const url = 'TEST';

    mutations.SET_AVATAR(state, { url });

    expect(state.avatar).toBe(url);
  });

  describe('GET_MENU', () => {
    it('menu was added', () => {
      const state = {};
      const nodeTitle = 'TEST';
      const menu = { node: { title: nodeTitle } };

      mutations.SET_MENU(state, { menu });

      expect(state.menu.node.title).toBe(nodeTitle);
    });

    it('smoke: menu was added and user is not changed', () => {
      const TEST_USER_NAME = 'TEST_USER';
      const user = {
        name: TEST_USER_NAME,
      };
      const state = { info: user };
      const menu = { nodes: [] };

      mutations.SET_MENU(state, { menu });

      expect(state.info.name).toBe(TEST_USER_NAME);
      expect(state.menu).toStrictEqual(menu);
    });
  });
});
