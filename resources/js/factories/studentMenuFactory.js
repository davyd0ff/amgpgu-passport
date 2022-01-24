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

const make = (education) => ({
  title: education.group,
  items: educationMenu.map((item) => ({
    ...item,
    subpath: education.academicPlanCode,
  })),
});

export default {
  make,
};
