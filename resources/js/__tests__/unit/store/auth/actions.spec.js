import auth from '@/store/auth';
import PassportAPI from '@/commands/passport';

describe('actions for auth store', () => {
  const commit = jest.fn();

  it('login', async () => {
    commit.mockClear();
    const username = 'TEST_USER_NAME';
    const password = 'TEST_USER_PASSWD';
    const SOME_TOKEN_DATA = 'SOME_TOKEN_DATA';
    PassportAPI.login = jest.fn((_) => ({ SOME_TOKEN_DATA }));

    await auth.actions.login({ commit }, { username, password });

    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('LOGIN', {
      token: { SOME_TOKEN_DATA },
    });
    expect(PassportAPI.login).toHaveBeenCalledTimes(1);
    expect(PassportAPI.login).toHaveBeenCalledWith({
      username,
      password,
    });
  });

  it('logout', async () => {
    commit.mockClear();
    PassportAPI.logout = jest.fn();

    await auth.actions.logout({ commit });

    expect(commit).toHaveBeenCalledTimes(1);
    expect(commit).toHaveBeenCalledWith('LOGOUT');
    expect(PassportAPI.logout).toHaveBeenCalledTimes(1);
  });
});
