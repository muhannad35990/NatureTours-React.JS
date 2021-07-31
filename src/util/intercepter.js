import axios from "axios";
import showNotification from "../components/alert/Alert.js";
import { BACKEND_URL } from "../configs/endpointConfig.js";
import * as endpoints from "../configs/endpointConfig";
import store from "../store";
import * as AlertActions from "../store/actions/AlertActions";
import * as authActions from "../store/actions/authActions";

const AxiosInstance = axios.create({
  baseURL: BACKEND_URL,
  timeout: 20000,
});
let retry = false;

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
    console.log("resp::", response);
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401 && !retry) {
      retry = true;
      refreshTheToken(error);
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
      return Promise.reject(error);
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
      return Promise.reject(error);
    }
  }
);

const refreshTheToken = async (error) => {
  const data = JSON.parse(error.response.config.data);
  error.response.config.data = data;

  const refreshToken = localStorage.getItem("refreshToken");
  AxiosInstance.post(endpoints.AUTO_LOGIN, { refreshToken })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      error.response.config.headers["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      retry = false;
      const rsp = AxiosInstance(error.response.config);
      return rsp;
    })
    .catch((err) => console.log("error in refreshing:", err.response));
};
export default AxiosInstance;
