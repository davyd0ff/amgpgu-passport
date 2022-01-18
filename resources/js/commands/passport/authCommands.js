import BACKEND_ENDPOINTS from '@/backend-endpoints/passport';
import httpClient from './httpClient';

export default {
  login: ({ username, password }) => {
    const backpoint = BACKEND_ENDPOINTS.login();
    const config = { ...backpoint, data: { username, password } };

    // todo think: "нарушается" сопряжение, данный метод знает какую функциональность несет в себе флаг
    return httpClient(config, { enableProcessing: false });
  },
  logout: () => {
    const backpoint = BACKEND_ENDPOINTS.logout();
    return httpClient(backpoint);
  },
};
