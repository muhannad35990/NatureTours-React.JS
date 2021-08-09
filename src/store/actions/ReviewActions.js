import * as types from "./types";

export const GetUserReviews = (data) => ({
  type: types.GET_USER_REVIEWS,
  payload: data,
});
export const setUserReviews = (data) => ({
  type: types.SET_USER_REVIEWS,
  payload: data,
});
