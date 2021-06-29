import * as types from './types';

export const registerUser = (authData) => ({
  type: types.REGISTER_USER, // used for triggering registerUserSaga
  payload: authData,
});
export const loginUser = (authData) => ({
  type: types.LOGIN_USER, // used for triggering registerUserSaga
  payload: authData,
});
