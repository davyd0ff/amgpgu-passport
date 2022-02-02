export const studentMenu = {
  student: [
    {
      title: 'MENU_ITEM_STUDENT_INDEX',
      items: [
        {
          title: 'MENU_ITEM_STUDENT_EDUCATION',
          items: [
            {
              title: 'MENU_ITEM_STUDENT_PRACTICE',
              items: [],
            },
            {
              title: 'MENU_ITEM_STUDENT_COURSE_WORKS',
              items: [],
            },
            {
              title: 'MENU_ITEM_STUDENT_QUALIFY_WORKS',
              items: [],
            },
          ],
        },
        {
          title: 'MENU_ITEM_STUDENT_MY_ACHIEVEMENT',
          items: [
            {
              title: 'MENU_ITEM_STUDENT_PROFESSIONAL_ACHIEVEMENT',
              items: [],
            },
            {
              title: 'MENU_ITEM_STUDENT_PUBLIC_LIFE',
              items: [],
            },
            {
              title: 'MENU_ITEM_STUDENT_UNIVERSITY_LIFE',
              items: [],
            },
            {
              title: 'MENU_ITEM_STUDENT_MY_PUBLICATIONS',
              items: [],
            },
            {
              title: 'MENU_ITEM_STUDENT_CERTIFICATES',
              items: [],
            },
            {
              title: 'MENU_ITEM_STUDENT_ADDITIONAL_EDUCATION',
              items: [],
            },
          ],
        },
      ],
    },
  ],
};

export const adminMenu = {
  admin: [
    {
      title: 'MENU_ITEM_ADMINISTRATION_INDEX',
      items: [
        {
          title: 'MENU_ITEM_ADMINISTRATION_NOTIFICATIONS',
          items: [
            {
              title: 'MENU_ITEM_ADMINISTRATION_ADD_NOTIFICATION_FOR_STUDENTS',
              items: [],
            },
          ],
        },
      ],
    },
  ],
};

export const fullMenu = {
  ...studentMenu,
  ...adminMenu,
};
