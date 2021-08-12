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
