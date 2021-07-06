import * as types from './types';

export const showAlert = (data) => ({
  type: types.SHOW_ALERT,
  payload: data,
});

export const removeAllAlerts = () => ({
  type: types.REMOVE_ALL_ALERT,
});
export const setSpiner = (data) => ({
  type: types.SET_SPINNER,
  payload: data,
});
