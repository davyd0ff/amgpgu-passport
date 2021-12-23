export default {
  getAllNotifications: state => {
    return state.notifications;
  },
  getNotReadedNotifications: state => count => {
    return state.notifications.filter(notification => !notification.isReaded && notification.isMeantForMe)
      .slice(0, count);
  },
  hasNotReadedNotifications: state => {
    return state.notifications.some(notification => !notification.isReaded && notification.isMeantForMe);
  },
  getNotification: state => id => {
    const index = state.notifications.findIndex(notification => notification.id === id);
    if (index !== -1) {
      return {...state.notifications[index]};
    } else {
      return {};
    }
  }
}