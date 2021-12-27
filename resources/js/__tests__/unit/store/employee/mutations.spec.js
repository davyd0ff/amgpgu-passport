import mutations from '@/store/employee/mutations';

describe('test store - employee mutations', () => {
  it('SET_TREE', () => {
    const context = 'SOME_TREE';
    const state = {
      [context]: {},
    };
    const tree = {
      TREE: {
        TEST_NODE: 'TEST',
      },
    };

    mutations.SET_TREE(state, { context, tree });
    expect(state[context]).toStrictEqual(tree);
  });
});
