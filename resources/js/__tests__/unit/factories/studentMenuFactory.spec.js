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
        },
        {
          title: 'MENU_ITEM_STUDENT_GRADES',
        },
        {
          title: 'MENU_ITEM_STUDENT_ORDERS',
        },
      ],
    });
  });
});
