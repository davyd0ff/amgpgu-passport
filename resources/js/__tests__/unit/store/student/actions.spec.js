import actions from '@/store/student/actions';
import PassportAPI from '@/commands/passport';

describe('test store - student actions', () => {
  describe('getStudentInfo', () => {
    it('commit has been called', async () => {
      const commit = jest.fn();
      const TEST_STUDENT = 'TEST_STUDENT';
      PassportAPI.getStudentInfo = jest
        .fn()
        .mockImplementation(() => ({ data: TEST_STUDENT }));

      await actions.getStudentInfo({ commit });

      expect(commit).toHaveBeenCalledWith('SET_STUDENT', {
        student: TEST_STUDENT,
      });
      expect(PassportAPI.getStudentInfo).toHaveBeenCalledTimes(1);
    });
  });
});
