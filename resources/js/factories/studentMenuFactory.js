const educationMenu = [
  {
    title: 'MENU_ITEM_STUDENT_CURRENT_ACADEMIC_PERFORMANCE',
  },
  {
    title: 'MENU_ITEM_STUDENT_GRADES',
  },
  {
    title: 'MENU_ITEM_STUDENT_ORDERS',
  },
];

// todo think: хорошая ли идея засунуть context в каждый пункт меню? Не лучше ли использовать Composite и CoR?

const make = (education) => ({
  title: education.group,
  items: educationMenu.map((item) => ({
    ...item,
    context: education,
  })),
});

export default {
  make,
};
