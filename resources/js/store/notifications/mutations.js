import Vue from 'vue';

export default {
  SET_NOTIFICATIONS: (state, { notifications }) => {
    Vue.set(state, 'all', notifications);
  },

  READ_NOTIFICATION: (state, { id }) => {
    const index = state.all.findIndex((notification) => notification.id === id);
    if (index !== -1) {
      state.all = [
        ...state.all.slice(0, index),
        { ...state.all[index], isReaded: true },
        ...state.all.slice(index + 1, state.all.length),
      ];
    }
  },
  READ_NOTIFICATIONS: (state) => {
    state.all = state.all.map((notification) => ({
      ...notification,
      isReaded: true,
    }));
  },

  UPDATE_NOTIFICATIONS: (state, { notifications }) => {
    state.all = [
      ...state.all.filter(
        (notification) =>
          !notifications.some(
            (_notification) => _notification.id === notification.id
          )
      ),
      ...notifications,
    ];
  },
};
