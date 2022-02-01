import actions from '@/store/student/actions';
import PassportAPI from '@/commands/passport';

describe('test store - student actions', () => {
  describe('getStudentInfo', () => {
    it('commit has been called', async () => {
      const commit = jest.fn();
      const TEST_STUDENT = 'TEST_STUDENT';
      PassportAPI.getStudentData = jest.fn(() => ({ TEST_STUDENT }));

      await actions.getStudentInfo({ commit });

      expect(commit).toHaveBeenCalledWith('SET_STUDENT', {
        student: { TEST_STUDENT },
      });
      expect(PassportAPI.getStudentData).toHaveBeenCalledTimes(1);
    });
  });
});
