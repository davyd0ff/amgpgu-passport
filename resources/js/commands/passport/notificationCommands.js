import BACKEND_ENDPOINTS from '@/backend-endpoints/passport';
import httpClient from './httpClient';

export default {
  getNotifications: () => {
    const backpoint = BACKEND_ENDPOINTS.getIncomingNotifications();
    return httpClient(backpoint);
  },
  readNotification: (notificationId) => {
    const backpoint = BACKEND_ENDPOINTS.readNotification(notificationId);
    return httpClient(backpoint);
  },
  readNotifications: () => {
    const backpoint = BACKEND_ENDPOINTS.readNotifications();
    return httpClient(backpoint);
  },
  sendNotification: (notification, context) => {
    const backpoint = BACKEND_ENDPOINTS.addNotification(context);
    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    let data = new FormData();
    data.append('title', notification.title);
    data.append('message', notification.message);
    data.append(
      'recipients',
      JSON.stringify(notification.recipients.map((r) => r.code))
    );
    notification.files.forEach((file, index) => {
      data.append(`files[${index}]`, file, file.name);
    });

    const options = { ...backpoint, headers, data };
    return httpClient(options);
  },
};
