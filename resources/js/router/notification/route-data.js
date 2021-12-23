export const NOTIFICATIONS_VIEW_ROUTE_DATA = {
  path: '/notifications/:id',
  props: true,
  meta: {
    title: "NOTIFICATIONS__VIEW_NOTIFICATION_PAGE_TITLE",
    auth: true,
  },
};

export const NOTIFICATIONS_LIST_ROUTE_DATA = {
  path: '/notifications',
  meta: {
    title: "NOTIFICATIONS__LIST_NOTIFICATIONS_PAGE_TITLE",
    auth: true,
  }
};