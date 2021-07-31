import * as endpoints from "../../configs/endpointConfig";
import AxiosInstance from "../../util/intercepter";
import { put } from "redux-saga/effects";
import * as authActions from "../actions/authActions";
import * as AlertActions from "../actions/AlertActions";

export function* loginUserSaga(action) {
  const response = yield AxiosInstance.post(
    endpoints.LOGIN_URL,
    action.payload
  );

  if (response.status === 200) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    yield put(authActions.setUserData(response.data.user));
  }
}
export function* autoLoginUserSaga(action) {
  const response = yield AxiosInstance.post(
    endpoints.AUTO_LOGIN,
    action.payload
  );

  if (response.status === 200) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    yield put(authActions.setUserData(response.data.user));
  }
}
export function* registerUserSaga(action) {
  const response = yield AxiosInstance.post(
    endpoints.REGISTER_URL,
    action.payload
  );
  if (response.status === 201) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    yield put(authActions.setUserData(response.data.user));
  }
}

export function* forgotPasswordsaga(action) {
  yield AxiosInstance.post(endpoints.FORGOT_PASSWORD, action.payload);
}
export function* resetPasswordsaga(action) {
  yield AxiosInstance.patch(
    `${endpoints.RESET_PASSWORD}/${action.payload.token}`,
    action.payload.values
  );
}

export function* updateCurrentPasswordSaga(action) {
  const response = yield AxiosInstance.patch(
    `${endpoints.UPDATE_PASSWORD}`,
    action.payload
  );
  console.log("response of update password:", response);
  if (response && response.status === 200) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    yield put(authActions.setUserData(response.data.user));
    yield put(
      AlertActions.showAlert({
        type: "success",
        title: response.statusText,
        message: response.data.message,
      })
    );
  }
}
