import {ADD_NOTIFICATION_FOR_STUDENT_ROUTE_DATA} from './route-data';

export default [
  {
    ...ADD_NOTIFICATION_FOR_STUDENT_ROUTE_DATA,
    component: () => import('../../pages/NotificationPages/AddNotificationForStudent'),
  },
];