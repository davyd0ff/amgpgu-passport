// import jest from 'jest';
import PassportApi from '@/commands/passport';
import actions from '@/store/employee/actions';

describe('store/employee/actions', () => {
  describe('getStudentsTree', () => {
    const commit = jest.fn();

    beforeEach(() => {
      commit.mockClear();
    });

    it('commit has been called', async () => {
      const TEST_TREE = 'TEST_TREE';
      PassportApi.getStudentsTree = jest.fn(() =>
        Promise.resolve({
          TEST_TREE,
        })
      );

      await actions.getStudentsTree({ commit }, {});

      expect(commit).toHaveBeenCalledWith('SET_STUDENTS_TREE', {
        tree: { TEST_TREE },
      });
    });

    describe('smoke tests', () => {
      it('getStudentsTree throws when api has rejected request', async () => {
        PassportApi.getStudentsTree = jest.fn(() =>
          Promise.reject({
            code: 'TEST ERROR',
          })
        );

        await expect(
          actions.getStudentsTree({ commit }, {})
        ).rejects.toStrictEqual({
          code: 'TEST ERROR',
        });
      });
    });
  });
});
