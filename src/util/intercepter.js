import axios from 'axios';

import showNotification from '../components/alert/Alert.js';
import { BACKEND_URL } from '../configs/endpointConfig.js';

import store from '../store';
import * as AlertActions from '../store/actions/AlertActions';
import * as authActions from '../store/actions/authActions';

const AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 20000,
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
    console.log(response);
    store.dispatch(AlertActions.setSpiner(false));
    if (response?.data?.token)
      localStorage.setItem('token', response.data.token);
    if (response?.data?.data?.user)
      store.dispatch(authActions.setUserData(response.data.data.user));

    if (response.status === 200) {
      store.dispatch(
        AlertActions.showAlert({
          type: 'success',
          title: response.statusText,
          message: response.data.message
            ? response.data.message
            : response.statusText,
        })
      );
    } else if (response.status === 201) {
      store.dispatch(
        AlertActions.showAlert({
          type: 'success',
          title: 'success',
          message: ' created successfully',
        })
      );
    } else {
      store.dispatch(
        AlertActions.showAlert({
          type: 'error',
          title: response.statusText,
          message: response.data.message
            ? response.data.message
            : response.statusText,
        })
      );
    }
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    store.dispatch(AlertActions.setSpiner(false));
    console.log(error.response);
    if (error.response) {
      originalRequest._retry = true;
      store.dispatch(
        AlertActions.showAlert({
          type: 'error',
          title: error.response.statusText,
          message: error.response.data.message
            ? error.response.data.message
            : error.response.statusText,
        })
      );
    } else {
      store.dispatch(
        AlertActions.showAlert({
          type: 'error',
          title: 'Network Error',
          message:
            'Fail to Connect to the server! check your connection and try again',
        })
      );
    }

    // if (
    //   error.response &&
    //   error.response.status === 403 &&
    //   !originalRequest._retry
    // ) {
    //   originalRequest._retry = true;
    //   const token = ''; //= await refreshAccessToken();
    //   localStorage.setItem('token', token);
    //   axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    //   return AxiosInstance(originalRequest);
    // }
    // else {
    //   showNotification('error', error.toString(), 'Error');
    // }
    return error;
  }
);
