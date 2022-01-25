import * as studentRouteData from '@/router/student/route-data';
import * as adminRouteData from '@/router/admin/route-data';

const mapMenuItemsAndUrls = [
  [
    'MENU_ITEM_STUDENT_CURRENT_ACADEMIC_PERFORMANCE',
    studentRouteData.ACADEMIC_PERFORMANCE.path,
  ],
  ['MENU_ITEM_STUDENT_GRADES', studentRouteData.GRADES.path],
  ['MENU_ITEM_STUDENT_ORDERS', studentRouteData.ORDERS.path],

  ['MENU_ITEM_STUDENT_PRACTICE', studentRouteData.PRACTICE.path],
  ['MENU_ITEM_STUDENT_COURSE_WORKS', studentRouteData.COURSE_WORKS.path],
  ['MENU_ITEM_STUDENT_QUALIFY_WORKS', studentRouteData.QUALIFYING_WORKS.path],
  [
    'MENU_ITEM_STUDENT_PROFESSIONAL_ACHIEVEMENT',
    studentRouteData.PROFESSIONAL_ACHIEVEMENT.path,
  ],
  ['MENU_ITEM_STUDENT_PUBLIC_LIFE', studentRouteData.PUBLIC_LIFE.path],
  ['MENU_ITEM_STUDENT_UNIVERSITY_LIFE', studentRouteData.UNIVERSITY_LIFE.path],
  ['MENU_ITEM_STUDENT_MY_PUBLICATIONS', studentRouteData.MY_PUBLICATIONS.path],
  ['MENU_ITEM_STUDENT_CERTIFICATES', studentRouteData.MY_CERTIFICATES.path],
  [
    'MENU_ITEM_STUDENT_ADDITIONAL_EDUCATION',
    studentRouteData.ADDITIONAL_EDUCATION.path,
  ],

  [
    'MENU_ITEM_ADMINISTRATION_ADD_NOTIFICATION_FOR_STUDENTS',
    adminRouteData.ADD_NOTIFICATION_FOR_STUDENT.path,
  ],
];

export default mapMenuItemsAndUrls;
