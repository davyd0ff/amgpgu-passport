import {
  STUDENT_DEFAULT_ROUTE_DATA,
  STUDENT_GRADES_ROUTE_DATA,
  STUDENT_ORDERS_ROUTE_DATA,
  STUDENT_ACADEMIC_PERFORMANCE_ROUTE_DATA,
  STUDENT_INFO_INDEX_ROUTE_DATA,
  STUDENT_SPECIALITY_ROUTE_DATA
} from './route-data';


export default [
  {
    ...STUDENT_INFO_INDEX_ROUTE_DATA,
    component: () => import('../../pages/Student')
  },
  {
    ...STUDENT_SPECIALITY_ROUTE_DATA,
    component: () => import('../../pages/StudentPages/Info'),
  },
  {
    ...STUDENT_GRADES_ROUTE_DATA,
    component: () => import('../../pages/StudentPages/Grades'),
  },
  {
    ...STUDENT_ACADEMIC_PERFORMANCE_ROUTE_DATA,
    component: () => import('../../pages/StudentPages/CurrentAcademicPerformance'),
  },
  {
    ...STUDENT_ORDERS_ROUTE_DATA,
    component: () => import('../../pages/StudentPages/Orders'),
  },
  {
    ...STUDENT_DEFAULT_ROUTE_DATA,
    component: () => import('../../pages/DefaultFileUploadPage'),
  },
];