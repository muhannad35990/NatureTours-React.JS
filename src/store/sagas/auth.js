import * as endpoints from '../../configs/endpointConfig';
import AxiosInstance from '../../util/intercepter';

export function* loginUserSaga(action) {
  yield AxiosInstance.post(endpoints.LOGIN_URL, action.payload);
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
