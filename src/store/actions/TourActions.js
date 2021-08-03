import * as types from "./types";

export const getAllTours = () => ({
  type: types.GET_ALL_TOURS, // used for triggering registerUserSaga
});

export const setToursData = (data) => ({
  type: types.SET_TOURS_DATA,
  payload: data,
});
