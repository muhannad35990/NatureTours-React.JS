import * as types from './types';
export const resetPassword = (data) => {
  return {
    type: types.RESET_PASSWORD, //
    data: data,
  };
};
