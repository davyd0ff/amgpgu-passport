import mapper from '@/frontend-points/mapperMenuItems';

jest.mock('@/frontend-points/mapMenuItemToUrl', () => [
  ['SUB_TEST_INDEX_1_1', '/some/url/for/test/1/1'],
  ['SUB_TEST_INDEX_2', '/some/url/for/test/2'],
]);

describe('mapperMenuItems', () => {
  it("menuItem hasn't items", () => {
    const menuItem = { title: 'TEST_INDEX' };

    const frontMenuItem = mapper(menuItem);

    expect(frontMenuItem).toStrictEqual({
      title: 'TEST_INDEX',
    });
  });

  it('menuItem has items', () => {
    const menuItem = {
      title: 'TEST_INDEX',
      items: [
        {
          title: 'SUB_TEST_INDEX_1',
          items: [{ title: 'SUB_TEST_INDEX_1_1' }],
        },
        { title: 'SUB_TEST_INDEX_2' },
      ],
    };

    const frontMenuItem = mapper(menuItem);

    expect(frontMenuItem).toStrictEqual({
      title: 'TEST_INDEX',
      items: [
        {
          title: 'SUB_TEST_INDEX_1',
          items: [
            {
              title: 'SUB_TEST_INDEX_1_1',
              url: '/some/url/for/test/1/1',
            },
          ],
        },
        {
          title: 'SUB_TEST_INDEX_2',
          url: '/some/url/for/test/2',
        },
      ],
    });
  });
});
