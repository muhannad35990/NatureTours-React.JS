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
    if (
      (response && response.status === 200) ||
      response.status === 201 ||
      response.status === 204
    ) {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        store.dispatch(authActions.setUserData(response.data.user));
      }

      store.dispatch(
        AlertActions.showAlert({
          type: "success",
          title: response.statusText,
          message: response.data.message,
        })
      );
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401 && !retry) {
      retry = true;
      return refreshTheToken(error);
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
      return error;
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
      return error;
    }
  }
);

const refreshTheToken = async (error) => {
  const data = JSON.parse(error.response.config.data);
  error.response.config.data = data;

  const refreshToken = localStorage.getItem("refreshToken");
  axios
    .post(endpoints.AUTO_LOGIN, { refreshToken })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      error.response.config.headers["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      retry = false;
      return AxiosInstance(error.response.config).then((resp) => {
        return resp;
      });
    })
    .catch((err) => err);
};
export default AxiosInstance;
