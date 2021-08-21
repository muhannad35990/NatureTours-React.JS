import * as types from "./types";

export const GetUserReviews = (data) => ({
  type: types.GET_USER_REVIEWS,
  payload: data,
});
export const setUserReviews = (data) => ({
  type: types.SET_USER_REVIEWS,
  payload: data,
});
export const UpdateUserReview = (data) => ({
  type: types.UPDATE_USER_REVIEWS,
  payload: data,
});
export const DeleteUserReview = (data) => ({
  type: types.DELETE_USER_REVIEWS,
  payload: data,
});
export const getAllReviews = (data) => ({
  type: types.GET_ALL_REVIEWS,
  payload: data,
});
export const setAllReviews = (data) => ({
  type: types.SET_ALL_REVIEWS,
  payload: data,
});
