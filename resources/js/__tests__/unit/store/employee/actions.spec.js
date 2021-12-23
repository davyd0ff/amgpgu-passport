// import jest from 'jest';
import PassportApi from '@/commands/passport';
import actions from '@/store/employee/actions';

describe('test store - employee actions', () => {
  describe('getStudentsTree', () => {
    it('commit has been called', async () => {
      const commit = jest.fn();
      const TEST_TREE = 'TEST_TREE';
      PassportApi.getStudentsTree = jest.fn().mockImplementation(() => ({
        data: TEST_TREE,
      }));

      await actions.getStudentsTree({ commit }, {});

      expect(commit).toHaveBeenCalledWith('SET_TREE', {
        tree: TEST_TREE,
        context: 'studentsTree',
      });
    });

    describe('smoke tests', () => {});
  });
});
