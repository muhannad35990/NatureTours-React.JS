import * as types from "./types";

export const getAllTours = (data) => ({
  type: types.GET_ALL_TOURS, // used for triggering registerUserSaga
  payload: data,
});

export const setToursData = (data) => ({
  type: types.SET_TOURS_DATA,
  payload: data,
});

export const getTour = (data) => ({
  type: types.GET_TOUR,
  payload: data,
});
export const setTour = (data) => ({
  type: types.SET_TOUR,
  payload: data,
});
