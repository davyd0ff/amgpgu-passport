import {
  NOTIFICATIONS_VIEW_ROUTE_DATA,
  NOTIFICATIONS_LIST_ROUTE_DATA
} from './route-data';


export default [
  {
    ...NOTIFICATIONS_VIEW_ROUTE_DATA,
    component: () => import('../../pages/NotificationPages/ViewNotification'),
  },
  {
    ...NOTIFICATIONS_LIST_ROUTE_DATA,
    component: () => import('../../pages/NotificationPages/ListNotifications'),
  }
];