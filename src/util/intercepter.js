import axios from "axios";
import showNotification from "../components/alert/Alert.js";
import { BACKEND_URL } from "../configs/endpointConfig.js";

import store from "../store";
import * as AlertActions from "../store/actions/AlertActions";
import * as authActions from "../store/actions/authActions";

const AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 20000,
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => {
    store.dispatch(AlertActions.setSpiner(false));
    return response;
  },
  (error) => {
    console.log(error.response);
    if (error.response && error.response.status === 401) {
      refreshTheToken();
      error.response.config.headers["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      return AxiosInstance(error.response.config);
    } else if (error.response && error.response.status) {
      store.dispatch(AlertActions.setSpiner(false));
      store.dispatch(
        AlertActions.showAlert({
          type: "error",
          title: error.response.statusText,
          message: error.response.data.message
            ? error.response.data.message
            : error.response.statusText,
        })
      );
      return error.response;
    } else {
      store.dispatch(AlertActions.setSpiner(false));
      store.dispatch(
        AlertActions.showAlert({
          type: "error",
          title: "Network Error",
          message:
            "Fail to Connect to the server! check your connection and try again",
        })
      );
      return error.response;
    }
  }
);

const refreshTheToken = async () => {
  await store.dispatch(
    authActions.autoLogin({
      refreshToken: localStorage.getItem("refreshToken"),
    })
  );
  return true;
};
export default AxiosInstance;
