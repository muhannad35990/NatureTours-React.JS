import * as endpoints from "../../configs/endpointConfig";
import AxiosInstance from "../../util/intercepter";
import { put } from "redux-saga/effects";
import * as authActions from "../actions/authActions";

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
