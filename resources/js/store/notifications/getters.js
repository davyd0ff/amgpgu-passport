export default {
  getAllNotifications: (state) => {
    return state.all;
  },
  getNotReadedNotifications: (state) => (count) => {
    return state.all
      .filter(
        (notification) => !notification.isReaded && notification.isMeantToMe
      )
      .slice(0, count);
  },
  hasNotReadedNotifications: (state) => {
    return state.all.some(
      (notification) => !notification.isReaded && notification.isMeantToMe
    );
  },
  getNotification: (state) => (id) => {
    const index = state.all.findIndex((notification) => notification.id === id);
    if (index !== -1) {
      return { ...state.all[index] };
    } else {
      return {};
    }
  },
};
