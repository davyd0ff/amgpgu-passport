import actions from '@/store/user/actions';
import PassportAPI from '@/commands/passport';

describe('test store - user actions', () => {
  const commit = jest.fn();

  it('getUserData', async () => {
    commit.mockClear();
    const TEST_USER_NAME = 'TEST_USER_NAME';
    PassportAPI.getUserData = jest.fn(() => ({ TEST_USER_NAME }));

    await actions.getUserData({ commit });

    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('SET_USER', {
      user: { TEST_USER_NAME },
    });
    expect(PassportAPI.getUserData).toHaveBeenCalledTimes(1);
  });

  it('getUserMenu', async () => {
    commit.mockClear();
    const TEST_MENU_LIST = 'TEST_MENU_LIST';
    PassportAPI.getUserMenu = jest.fn(() => ({ TEST_MENU_LIST }));

    await actions.getUserMenu({ commit });

    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('SET_MENU', {
      menu: { TEST_MENU_LIST },
    });
    expect(PassportAPI.getUserMenu).toHaveBeenCalledTimes(1);
  });

  it('uploadAvatar', async () => {
    commit.mockClear();
    const avatar = 'THIS_IS_SOME_FILE';
    const url = 'SOME_URL_TO_FILE';
    PassportAPI.uploadAvatar = jest.fn((_) => url);

    await actions.uploadAvatar({ commit }, { file: avatar });

    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('SET_AVATAR', { url });
    expect(PassportAPI.uploadAvatar).toHaveBeenCalledTimes(1);
    expect(PassportAPI.uploadAvatar).toHaveBeenCalledWith(avatar);
  });
});
