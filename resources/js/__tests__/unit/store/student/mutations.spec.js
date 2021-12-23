import mutations from '@/store/student/mutations';

describe('test student mutations', () => {
  it('SET_STUDENT', () => {
    let state = {};
    const student = 'TEST';

    mutations.SET_STUDENT(state, { student });

    expect(state.student).toBe(student);
  });
});
