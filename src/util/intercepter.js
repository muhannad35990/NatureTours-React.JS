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

AxiosInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export default AxiosInstance;

// Response interceptor for API calls
AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      console.log('error from the intercepter');
      originalRequest._retry = true;
      const token = ''; //= await refreshAccessToken();
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      return AxiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);
