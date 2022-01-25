export const ADD_NOTIFICATION_FOR_STUDENT = {
  path: '/notifications/add-for-students',
  component: () =>
    import('@/pages/NotificationPages/AddNotificationForStudents'),
  name: 'ADMIN_ADD_NOTIFICATION_FOR_STUDENTS',
  meta: {
    title: 'ADMIN__ADD_NOTIFICATION_FOR_STUDENTS_PAGE_TITLE',
    auth: true,
  },
};
