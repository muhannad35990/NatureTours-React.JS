import * as types from "./types";

export const UpdateMe = (data) => ({
  type: types.UPDATE_ME,
  payload: data,
});
export const GetAllUsers = () => ({
  type: types.GET_USERS,
});
export const setAllUsers = (data) => ({
  type: types.SET_USERS,
  payload: data,
});
export const insertNewUser = (data) => ({
  type: types.INSERT_NEW_USER,
  payload: data,
});
export const updateUser = (data) => ({
  type: types.UPDATE_USER,
  payload: data,
});
export const deleteUser = (data) => ({
  type: types.DELETE_USER,
  payload: data,
});
export const GetAllguides = () => ({
  type: types.GET_GUIDES,
});
export const setAllguides = (data) => ({
  type: types.SET_GUIDES,
  payload: data,
});
