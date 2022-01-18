import BACKEND_ENDPOINTS from '@/backend-endpoints/passport';
import httpClient from './httpClient';

export default {
  getUserData: () => {
    const backpoint = BACKEND_ENDPOINTS.getUserData();
    return httpClient(backpoint);
  },
  getUserMenu: () => {
    const backpoint = BACKEND_ENDPOINTS.getUserMenu();
    return httpClient(backpoint);
  },
};
