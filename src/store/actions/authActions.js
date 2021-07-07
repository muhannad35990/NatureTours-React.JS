import * as types from './types';

export const registerUser = (authData) => ({
  type: types.REGISTER_USER, // used for triggering registerUserSaga
  payload: authData,
});
export const loginUser = (authData) => ({
  type: types.LOGIN_USER, // used for triggering registerUserSaga
  payload: authData,
});
export const setUserData = (user) => ({
  type: types.SET_USER_DATA,
  payload: user,
});
export const logUserOut = () => ({ type: 'LOG_OUT' });

export const forgotPassword = (email) => ({
  type: types.FORGOT_PASSWORD,
  payload: email,
});
export const resetPassword = (data) => ({
  type: types.RESET_PASSWORD,
  payload: data,
});
