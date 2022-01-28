export const NOTIFICATIONS_VIEW = {
  path: '/notifications/:id',
  component: () => import('@/pages/NotificationPages/ViewNotification'),
  props: true,
  meta: {
    title: 'NOTIFICATIONS__VIEW_NOTIFICATION_TITLE_PAGE',
    auth: true,
  },
};

export const NOTIFICATIONS_LIST = {
  path: '/notifications',
  component: () => import('@/pages/NotificationPages/ListNotifications'),
  meta: {
    title: 'NOTIFICATIONS__LIST_NOTIFICATIONS_TITLE_PAGE',
    auth: true,
  },
};
