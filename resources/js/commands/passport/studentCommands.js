import BACKEND_ENDPOINTS from '@/backend-endpoints/passport';
import httpClient from './httpClient';

export default {
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
