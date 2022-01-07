import PassportApi from '@/commands/passport';

export default {
  getNotifications: async ({ commit }) => {
    try {
      const response = await PassportApi.getNotifications();
      commit('SET_NOTIFICATIONS', { notifications: response.data });
    } catch (err) {
      throw new Error(err);
    }
  },

  readNotification: async ({ commit }, { id }) => {
    try {
      await PassportApi.readNotification(id);
      commit('READ_NOTIFICATION', { id });
    } catch (err) {
      throw new Error(err);
    }
  },

  readNotifications: async ({ commit }) => {
    try {
      await PassportApi.readNotifications();
      commit('READ_NOTIFICATIONS');
    } catch (err) {
      throw new Error(err);
    }
  },

  sendNotification: async ({ commit }, { notification, context }) => {
    try {
      await PassportApi.sendNotification(notification, context);
    } catch (error) {
      throw new Error(error);
    }
  },
};
