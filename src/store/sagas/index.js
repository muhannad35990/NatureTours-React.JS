import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/types';
import {
  registerUserSaga,
  loginUserSaga,
  forgotPasswordsaga,
  resetPasswordsaga,
  autoLoginUserSaga,
} from './auth';
import { updateMeSaga } from './user';

export function* watchAuth() {
  yield all([takeEvery(types.REGISTER_USER, registerUserSaga)]);
  yield all([takeEvery(types.LOGIN_USER, loginUserSaga)]);
  yield all([takeEvery(types.UPDATE_ME, updateMeSaga)]);
  yield all([takeEvery(types.FORGOT_PASSWORD, forgotPasswordsaga)]);
  yield all([takeEvery(types.RESET_PASSWORD, resetPasswordsaga)]);
  yield all([takeEvery(types.AUTO_LOGIN, autoLoginUserSaga)]);
}
