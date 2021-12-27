import getters from '@/store/files/getters';

describe('getters in files store', () => {
  it('files', () => {
    const state = {
      test: ['TEST_FILE_1', 'TEST_FILE_2'],
      other: ['OTHER_TEST_FILE_1'],
    };

    const result = getters.files(state)('test');

    expect(result).toStrictEqual(['TEST_FILE_1', 'TEST_FILE_2']);
  });
});
