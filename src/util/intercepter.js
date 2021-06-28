import axios from 'axios';
import { BACKEND_URL } from '../configs/endpointConfig.js';

const AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

AxiosInstance.interceptors.request.use((config) => {
  const configWithBasicAuth = { ...config };
  configWithBasicAuth.auth = {
    username: 'mmcenter',
    password: 'dlKD/877%unK!#891__r',
  };
  return configWithBasicAuth;
});

export default AxiosInstance;
