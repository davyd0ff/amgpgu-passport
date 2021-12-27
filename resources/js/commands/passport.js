import PassportClient from '@/http/passportClient.js';
import BACKEND_ENDPOINTS from '@/backend-endpoints/passport.js';

function httpClient(config, options = {}) {
  const client = new PassportClient(options);
  return client.request(config);
}

const LoginCommands = {
  login: ({ username, password }) => {
    const backpoint = BACKEND_ENDPOINTS.login();
    const config = { ...backpoint, data: { username, password } };

    // todo think: "нарушается" сопряжение
    return httpClient(config, { enableProcessing: false });
  },
};

const StudentCommands = {
  getStudentData: () => {
    const backpoint = BACKEND_ENDPOINTS.getStudentData();
    return httpClient(backpoint);
  },
  getStudentsTree: (facultyCode = undefined) => {
    const backpoint = facultyCode
      ? BACKEND_ENDPOINTS.getStudentsTreeOfFaculty(facultyCode)
      : BACKEND_ENDPOINTS.getStudentsTree();
    return httpClient(backpoint);
  },
};

const FileCommands = {
  deleteFile: (fileId) => {
    const backpoint = BACKEND_ENDPOINTS.deleteFile(fileId);
    return httpClient(backpoint);
  },
  getFiles: (context) => {
    const backpoint = BACKEND_ENDPOINTS.getFiles(context);
    return httpClient(backpoint);
  },
  uploadFiles: (files, context, onUploadProgress) => {
    const backpoint = BACKEND_ENDPOINTS.uploadFile(context);

    let data = new FormData();
    files.forEach((file, index) => {
      data.append(`files[${index}]`.file, file.name);
    });
    // data.append(`files[0]`, file, file.name);

    const headers = {
      'Content-Type': 'multipart/form-data',
    };

    const options = { ...backpoint, headers, data, onUploadProgress };
    return httpClient(options);
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
    const backpoint = BACKEND_ENDPOINTS.getNotifications();
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
};

export default {
  ...LoginCommands,
  ...UserCommands,
  ...StudentCommands,
  ...NotificationCommands,
  ...FileCommands,
};
