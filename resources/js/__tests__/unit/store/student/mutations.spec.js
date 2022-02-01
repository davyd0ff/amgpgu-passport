import mutations from '@/store/student/mutations';

describe('test student mutations', () => {
  it('SET_STUDENT', () => {
    const state = {
      info: {},
    };
    const student = {
      info: { name: 'TEST' },
      educations: [{ group: 'TEST' }],
    };

    mutations.SET_STUDENT(state, { student });

    expect(state.info).toStrictEqual({ name: 'TEST' });
    expect(state.educations).toStrictEqual([{ group: 'TEST' }]);
  });
});
