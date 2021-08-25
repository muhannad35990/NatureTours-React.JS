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
  deleteBookingSaga,
  getAllBookingsSaga,
  getBookingSaga,
  getMyBookingsSaga,
  getSessionSaga,
  updateBookingSaga,
} from "./bookings";
import {
  getUserReviewsSaga,
  updateUserReviewsSaga,
  deleteUserReviewsSaga,
  getAllReviewsSaga,
  deleteReviewSaga,
} from "./review";
import {
  getAllToursSaga,
  getTourSaga,
  getTourReviewsSaga,
  updateTourSaga,
  insertTourLocationSaga,
  deleteTourLocationSaga,
  insertNewTourSaga,
  deleteTourSaga,
} from "./tours";
import {
  deleteUserSaga,
  getAllGuidesSaga,
  getAllusersSaga,
  insertNewUserSaga,
  updateMeSaga,
  updateUserSaga,
} from "./user";

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
  yield all([takeEvery(types.UPDATE_TOUR, updateTourSaga)]);
  yield all([takeEvery(types.INSERT_NEW_TOUR, insertNewTourSaga)]);
  yield all([takeEvery(types.DELETE_TOUR, deleteTourSaga)]);

  yield all([takeEvery(types.INSERT_TOUR_LOCATION, insertTourLocationSaga)]);
  yield all([takeEvery(types.DELETE_TOUR_LOCATION, deleteTourLocationSaga)]);
  //reviews
  yield all([takeEvery(types.GET_USER_REVIEWS, getUserReviewsSaga)]);
  yield all([takeEvery(types.UPDATE_USER_REVIEWS, updateUserReviewsSaga)]);
  yield all([takeEvery(types.DELETE_USER_REVIEWS, deleteUserReviewsSaga)]);
  yield all([takeEvery(types.GET_ALL_REVIEWS, getAllReviewsSaga)]);
  yield all([takeEvery(types.DELETE_REVIEW, deleteReviewSaga)]);

  //users
  yield all([takeEvery(types.GET_USERS, getAllusersSaga)]);
  yield all([takeEvery(types.INSERT_NEW_USER, insertNewUserSaga)]);
  yield all([takeEvery(types.UPDATE_USER, updateUserSaga)]);
  yield all([takeEvery(types.DELETE_USER, deleteUserSaga)]);
  yield all([takeEvery(types.GET_GUIDES, getAllGuidesSaga)]);

  //bookings
  yield all([takeEvery(types.GET_ALL_BOOKINGS, getAllBookingsSaga)]);
  yield all([takeEvery(types.GET_BOOKING, getBookingSaga)]);
  yield all([takeEvery(types.GET_CHECKOUT_SESSION, getSessionSaga)]);
  yield all([takeEvery(types.UPDATE_BOOKING, updateBookingSaga)]);
  yield all([takeEvery(types.DELETE_BOOKING, deleteBookingSaga)]);
  yield all([takeEvery(types.GET_MY_BOOKINGS, getMyBookingsSaga)]);
}
