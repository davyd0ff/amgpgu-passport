import mutations from '@/store/employee/mutations';

describe('store/employee/mutations', () => {
  const tree = {
    TREE: {
      TEST_NODE: 'TEST',
    },
  };
  it('SET_STUDENTS_TREE', () => {
    const state = {
      trees: {
        students: {},
        employees: {},
        listeners: {},
      },
    };

    mutations.SET_STUDENTS_TREE(state, { tree });

    expect(state.trees.students).toStrictEqual({
      TREE: {
        TEST_NODE: 'TEST',
      },
    });
    expect(state.trees.employees).toStrictEqual({});
    expect(state.trees.listeners).toStrictEqual({});
  });

  it('SET_EMPLOYEES_TREE', () => {
    const state = {
      trees: {
        students: {},
        employees: {},
        listeners: {},
      },
    };

    mutations.SET_EMPLOYEES_TREE(state, { tree });

    expect(state.trees.employees).toStrictEqual({
      TREE: {
        TEST_NODE: 'TEST',
      },
    });
    expect(state.trees.students).toStrictEqual({});
    expect(state.trees.listeners).toStrictEqual({});
  });

  it('SET_LISTENERS_TREE', () => {
    const state = {
      trees: {
        students: {},
        employees: {},
        listeners: {},
      },
    };

    mutations.SET_LISTENERS_TREE(state, { tree });

    expect(state.trees.listeners).toStrictEqual({
      TREE: {
        TEST_NODE: 'TEST',
      },
    });
    expect(state.trees.students).toStrictEqual({});
    expect(state.trees.employees).toStrictEqual({});
  });
});
