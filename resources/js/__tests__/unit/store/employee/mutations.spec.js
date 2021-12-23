import mutations from '@/store/employee/mutations';

describe('test store - employee mutations', () => {
  it('SET_TREE', () => {
    const state = {};
    const tree = {
      TREE: {
        TEST_NODE: 'TEST',
      },
    };
    const context = 'SOME_TREE';

    mutations.SET_TREE(state, { context, tree });

    expect(state.employee[context]).toStrictEqual(tree);
  });
});
