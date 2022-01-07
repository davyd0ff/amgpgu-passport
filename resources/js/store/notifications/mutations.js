import Vue from 'vue';

export default {
  SET_NOTIFICATIONS: (state, { notifications }) => {
    console.log('store/mutations/SET_NOTIFICATIONS', notifications);
    // state.notifications = notifications;
    Vue.set(state, 'notifications', notifications);
  },

  READ_NOTIFICATION: (state, { id }) => {
    const index = state.notifications.findIndex(
      (notification) => notification.id === id
    );
    if (index !== -1) {
      state.notifications = [
        ...state.notifications.slice(0, index),
        { ...state.notifications[index], isReaded: true },
        ...state.notifications.slice(index + 1, state.notifications.length),
      ];
    }
  },
  READ_NOTIFICATIONS: (state) => {
    state.notifications = state.notifications.map((notification) => ({
      ...notification,
      isReaded: true,
    }));
  },

  UPDATE_NOTIFICATIONS: (state, { notifications }) => {
    state.notifications = [
      ...state.notifications.filter(
        (notification) =>
          !notifications.some(
            (_notification) => _notification.id === notification.id
          )
      ),
      ...notifications,
    ];
  },
};
