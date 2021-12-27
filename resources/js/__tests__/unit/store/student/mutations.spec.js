import mutations from '@/store/student/mutations';

describe('test student mutations', () => {
  it('SET_STUDENT', () => {
    const state = {
      info: {},
    };
    const student = { name: 'TEST' };

    mutations.SET_STUDENT(state, { student });

    expect(state.info).toStrictEqual(student);
  });
});
