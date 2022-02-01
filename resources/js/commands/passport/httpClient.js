import PassportClient from '@/http/passportClient.js';

export default function httpClient(config, options = {}) {
  const defaultOptions = {
    baseURL: 'https://passport.amgpgu.ru/',
  };
  const client = new PassportClient({ ...defaultOptions, ...options });
  return client.request(config).then((response) => response.data);
}
