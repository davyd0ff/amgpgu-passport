export default {
  getAllNotifications: (state) => {
    return state;
  },
  getNotReadedNotifications: (state) => (count) => {
    return state
      .filter(
        (notification) => !notification.isReaded && notification.isMeantForMe
      )
      .slice(0, count);
  },
  hasNotReadedNotifications: (state) => {
    return state.some(
      (notification) => !notification.isReaded && notification.isMeantForMe
    );
  },
  getNotification: (state) => (id) => {
    const index = state.findIndex((notification) => notification.id === id);
    if (index !== -1) {
      return { ...state[index] };
    } else {
      return {};
    }
  },
};
