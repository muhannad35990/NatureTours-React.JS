import * as types from "./types";

export const UpdateMe = (data) => ({
  type: types.UPDATE_ME,
  payload: data,
});
