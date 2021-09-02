import * as types from "./types";

//CURD
export const getAllTours = (data) => ({
  type: types.GET_ALL_TOURS,
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
export const insertNewTour = (data) => ({
  type: types.INSERT_NEW_TOUR,
  payload: data,
});
export const updateTour = (data) => ({
  type: types.UPDATE_TOUR,
  payload: data,
});
export const deleteTour = (data) => ({
  type: types.DELETE_TOUR,
  payload: data,
});
export const deleteTourLocation = (data) => ({
  type: types.DELETE_TOUR_LOCATION,
  payload: data,
});
export const insertTourLocation = (data) => ({
  type: types.INSERT_TOUR_LOCATION,
  payload: data,
});
//REDUX STORE
export const setToursData = (data) => ({
  type: types.SET_TOURS_DATA,
  payload: data,
});
//OTHER
export const getTourReviews = (data) => ({
  type: types.GET_TOUR_REVIEWS,
  payload: data,
});
export const setTourReviews = (data) => ({
  type: types.SET_TOUR_REVIEWS,
  payload: data,
});
export const getTop5Cheap = () => ({
  type: types.GET_TOP_5_CHEAP,
});
export const getTop5Expense = () => ({
  type: types.GET_TOP_5_EXPENSE,
});
export const getToursByDistance = (data) => ({
  type: types.GET_TOURS_BY_DISTANCE,
  payload: data,
});

export const getTourStatistics = () => ({
  type: types.GET_TOUR_STATISTICS,
});
export const setTourStatistics = (data) => ({
  type: types.SET_TOUR_STATISTICS,
  payload: data,
});
