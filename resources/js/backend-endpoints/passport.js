const BACKEND_ENDPOINTS = {
  login: () => ({ method: 'post', url: 'api/login' }),
  refreshToken: () => ({ method: 'post', url: 'api/login/refresh' }),
  logout: () => ({ method: 'post', url: 'api/logout' }),

  getUserData: () => ({ method: 'get', url: 'api/user' }),
  getUserMenu: () => ({ method: 'get', url: 'api/user/menu' }),

  deleteFile: (fileId) => ({
    method: 'delete',
    url: `/api/files/delete/${fileId}`,
  }),
  getFiles: (context) => ({
    method: 'get',
    url: `/api/files/${context}`,
  }),
  uploadFile: (context) => ({
    method: 'post',
    url: `/api/files/${context}`,
  }),

  getStudentData: () => ({ method: 'get', url: 'api/user/student-data' }),
  getStudentsTree: () => ({ method: 'get', url: 'api/students/tree' }),
  getStudentsTreeOfFaculty: (facultyCode) => ({
    method: 'get',
    url: `api/students/tree/${facultyCode}`,
  }),

  getIncomingNotifications: () => ({
    method: 'get',
    url: 'api/notifications/incoming',
  }),
  readNotification: (notificationId) => ({
    method: `post', url: 'api/notifications/read/${notificationId}`,
  }),
  readNotifications: () => ({
    method: 'post',
    url: 'api/notifications/read-all',
  }),

  addNotificationForStudents: () => ({
    method: 'post',
    url: 'api/admin/notifications/add-for-students',
  }),
  addNotificationForEmployees: () => ({
    method: 'post',
    url: 'api/admin/notifications/add-for-employees',
  }),
  addNotificationForListeners: () => ({
    method: 'post',
    url: 'api/admin/notifications/add-for-listeners',
  }),
};

export default BACKEND_ENDPOINTS;
