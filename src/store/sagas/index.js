import { takeEvery, all, takeLatest } from "redux-saga/effects";
import * as types from "../actions/types";
import {
  registerUserSaga,
  loginUserSaga,
  forgotPasswordsaga,
  resetPasswordsaga,
  autoLoginUserSaga,
  updateCurrentPasswordSaga,
} from "./auth";
import {
  getUserReviewsSaga,
  updateUserReviewsSaga,
  deleteUserReviewsSaga,
} from "./review";
import { getAllToursSaga, getTourSaga, getTourReviewsSaga } from "./tours";
import { getAllusersSaga, updateMeSaga } from "./user";

export function* watchAuth() {
  //auth
  yield all([takeEvery(types.REGISTER_USER, registerUserSaga)]);
  yield all([takeEvery(types.LOGIN_USER, loginUserSaga)]);
  yield all([takeEvery(types.UPDATE_ME, updateMeSaga)]);
  yield all([takeEvery(types.FORGOT_PASSWORD, forgotPasswordsaga)]);
  yield all([takeEvery(types.RESET_PASSWORD, resetPasswordsaga)]);
  yield all([takeEvery(types.AUTO_LOGIN, autoLoginUserSaga)]);
  yield all([takeEvery(types.UPDATE_PASSWORD, updateCurrentPasswordSaga)]);
  //tours
  yield all([takeEvery(types.GET_ALL_TOURS, getAllToursSaga)]);
  yield all([takeEvery(types.GET_TOUR, getTourSaga)]);
  yield all([takeEvery(types.GET_TOUR_REVIEWS, getTourReviewsSaga)]);

  //reviews
  yield all([takeEvery(types.GET_USER_REVIEWS, getUserReviewsSaga)]);
  yield all([takeEvery(types.UPDATE_USER_REVIEWS, updateUserReviewsSaga)]);
  yield all([takeEvery(types.DELETE_USER_REVIEWS, deleteUserReviewsSaga)]);

  //users
  yield all([takeEvery(types.GET_USERS, getAllusersSaga)]);
}
