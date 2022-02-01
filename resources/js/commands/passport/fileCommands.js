import BACKEND_ENDPOINTS from '@/backend-endpoints/passport';
import httpClient from './httpClient';

export default {
  deleteFile: (fileId) => {
    const backpoint = BACKEND_ENDPOINTS.deleteFile(fileId);
    return httpClient(backpoint);
  },
  getFiles: (context) => {
    const backpoint = BACKEND_ENDPOINTS.fetchFiles(context);
    return httpClient(backpoint).then((files) => Object.values(files));
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
    return httpClient(options).then((data) => Object.values(data));
  },
  uploadAvatar: (file) => {
    return this.uploadFile(file, 'avatar');
  },
};
