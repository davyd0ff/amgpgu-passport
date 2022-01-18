import PassportClient from '@/http/passportClient.js';
import BACKEND_ENDPOINTS from '@/backend-endpoints/passport.js';

function httpClient(config, options = {}) {
  const defaultOptions = {
    baseURL: 'https://passport.amgpgu.ru/',
  };
  const client = new PassportClient({ ...defaultOptions, ...options });
  return client.request(config);
}

const LoginCommands = {
  login: ({ username, password }) => {
    const backpoint = BACKEND_ENDPOINTS.login();
    const config = { ...backpoint, data: { username, password } };

    // todo think: "нарушается" сопряжение
    return httpClient(config, { enableProcessing: false });
  },
  logout: () => {
    const backpoint = BACKEND_ENDPOINTS.logout();
    return httpClient(backpoint);
  },
};

const StudentCommands = {
  getStudentInfo: () => {
    const backpoint = BACKEND_ENDPOINTS.getStudentData();
    return httpClient(backpoint);
  },
  getStudentsTree: (facultyCode = null) => {
    const backpoint = facultyCode
      ? BACKEND_ENDPOINTS.getStudentsTreeOfFaculty(facultyCode)
      : BACKEND_ENDPOINTS.getStudentsTree();
    return httpClient(backpoint).then((response) => response.data);
  },
};

const FileCommands = {
  deleteFile: (fileId) => {
    const backpoint = BACKEND_ENDPOINTS.deleteFile(fileId);
    return httpClient(backpoint);
  },
  getFiles: (context) => {
    const backpoint = BACKEND_ENDPOINTS.fetchFiles(context);
    return httpClient(backpoint).then((response) =>
      Object.values(response.data)
    );
  },
  uploadFiles: (files, context, onUploadProgress) => {
    const backpoint = BACKEND_ENDPOINTS.uploadFile(context);

    let data = new FormData();
    files.forEach((file, index) => {
      data.append(`files[${index}]`, file, file.name);
    });

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    const options = { ...backpoint, headers, data, onUploadProgress };
    return httpClient(options).then((response) => Object.values(response.data));
  },
  uploadAvatar: (file) => {
    return this.uploadFile(file, 'avatar');
  },
};

const UserCommands = {
  getUserData: () => {
    const backpoint = BACKEND_ENDPOINTS.getUserData();
    return httpClient(backpoint);
  },
  getUserMenu: () => {
    const backpoint = BACKEND_ENDPOINTS.getUserMenu();
    return httpClient(backpoint);
  },
};

const NotificationCommands = {
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

export default {
  ...LoginCommands,
  ...UserCommands,
  ...StudentCommands,
  ...NotificationCommands,
  ...FileCommands,
};
