import * as types from "./types";

//CURD
export const getAllBookings = () => ({
  type: types.GET_ALL_BOOKINGS,
});
export const setAllBookings = (data) => ({
  type: types.SET_ALL_BOOKINGS,
  payload: data,
});
export const getCheckoutSession = (data) => ({
  type: types.GET_CHECKOUT_SESSION,
  payload: data,
});
export const setCheckoutSession = (data) => ({
  type: types.SET_CHECKOUT_SESSION,
  payload: data,
});
export const getBooking = (data) => ({
  type: types.GET_BOOKING,
  payload: data,
});
export const setBooking = (data) => ({
  type: types.SET_BOOKING,
  payload: data,
});
export const updateBooking = (data) => ({
  type: types.UPDATE_BOOKING,
  payload: data,
});
export const deleteBooking = (data) => ({
  type: types.DELETE_BOOKING,
  payload: data,
});
export const getMyBookings = (data) => ({
  type: types.GET_MY_BOOKINGS,
  payload: data,
});
export const setMyBookings = (data) => ({
  type: types.SET_MY_BOOKINGS,
  payload: data,
});
