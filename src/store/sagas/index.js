import { takeEvery, all, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/types';
import { registerUserSaga, loginUserSaga } from './auth';

export function* watchAuth() {
  yield all([takeEvery(types.REGISTER_USER, registerUserSaga)]);
  yield all([takeEvery(types.LOGIN_USER, loginUserSaga)]);
}
