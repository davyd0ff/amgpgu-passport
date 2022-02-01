import PassportApi from '@/commands/passport';

export default {
  getNotifications: async ({ commit }) => {
    try {
      const notifications = await PassportApi.getNotifications();
      commit('SET_NOTIFICATIONS', { notifications });
    } catch (err) {
      throw err;
    }
  },

  readNotification: async ({ commit }, { id }) => {
    try {
      await PassportApi.readNotification(id);
      commit('READ_NOTIFICATION', { id });
    } catch (err) {
      throw err;
    }
  },

  readNotifications: async ({ commit }) => {
    try {
      await PassportApi.readNotifications();
      commit('READ_NOTIFICATIONS');
    } catch (err) {
      throw err;
    }
  },

  sendNotification: async ({ commit }, { notification, context }) => {
    try {
      await PassportApi.sendNotification(notification, context);
    } catch (error) {
      throw error;
    }
  },
};
