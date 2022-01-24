import * as studentRouteData from '@/router/student/route-data';
import * as adminRouteData from '@/router/admin/route-data';

const MenuItemsAndUrls = [
  [
    'MENU_ITEM_STUDENT_CURRENT_ACADEMIC_PERFORMANCE',
    studentRouteData.STUDENT_ACADEMIC_PERFORMANCE_ROUTE_DATA.path,
  ],
  ['MENU_ITEM_STUDENT_GRADES', studentRouteData.STUDENT_GRADES_ROUTE_DATA.path],
  ['MENU_ITEM_STUDENT_ORDERS', studentRouteData.STUDENT_ORDERS_ROUTE_DATA.path],

  ['MENU_ITEM_STUDENT_PRACTICE', '/student/practice'],
  ['MENU_ITEM_STUDENT_COURSE_WORKS', '/student/course-works'],
  ['MENU_ITEM_STUDENT_QUALIFY_WORKS', '/student/qualifying-works'],
  [
    'MENU_ITEM_STUDENT_PROFESSIONAL_ACHIEVEMENT',
    '/student/professional-achievement',
  ],
  ['MENU_ITEM_STUDENT_PUBLIC_LIFE', '/student/public-life'],
  ['MENU_ITEM_STUDENT_UNIVERSITY_LIFE', '/student/university-life'],
  ['MENU_ITEM_STUDENT_MY_PUBLICATIONS', '/student/my-publications'],
  ['MENU_ITEM_STUDENT_CERTIFICATES', '/student/my-certificates'],
  ['MENU_ITEM_STUDENT_ADDITIONAL_EDUCATION', '/student/additional-education'],

  [
    'MENU_ITEM_ADMINISTRATION_ADD_NOTIFICATION_FOR_STUDENTS',
    adminRouteData.ADD_NOTIFICATION_FOR_STUDENT_ROUTE_DATA.path,
  ],
];

const map = new Map(MenuItemsAndUrls);
const getUrl = (key) => map.get(key);

export default getUrl;
