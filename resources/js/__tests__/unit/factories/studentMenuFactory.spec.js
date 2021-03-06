import studentMenuFactory from '@/factories/studentMenuFactory';

describe('studentMenuFactory', () => {
  it('make()', () => {
    const education = {
      group: 'TEST',
    };

    const menu = studentMenuFactory.make(education);

    expect(menu).toStrictEqual({
      title: 'TEST',
      items: [
        {
          title: 'MENU_ITEM_STUDENT_CURRENT_ACADEMIC_PERFORMANCE',
          context: {
            group: 'TEST',
          },
        },
        {
          title: 'MENU_ITEM_STUDENT_GRADES',
          context: expect.any(Object),
        },
        {
          title: 'MENU_ITEM_STUDENT_ORDERS',
          context: expect.any(Object),
        },
      ],
    });
  });
});
