import * as endpoints from "../../configs/endpointConfig";
import AxiosInstance from "../../util/intercepter";
import { put } from "redux-saga/effects";
import * as authActions from "../actions/authActions";
import * as AlertActions from "../actions/AlertActions";

export function* loginUserSaga(action) {
  yield AxiosInstance.post(endpoints.LOGIN_URL, action.payload);
}
export function* autoLoginUserSaga(action) {
  yield AxiosInstance.post(endpoints.AUTO_LOGIN, action.payload);
}
export function* registerUserSaga(action) {
  yield AxiosInstance.post(endpoints.REGISTER_URL, action.payload);
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
  yield AxiosInstance.patch(`${endpoints.UPDATE_PASSWORD}`, action.payload);
}
