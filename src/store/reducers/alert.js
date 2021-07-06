import * as types from '../actions/types';

const initialState = { alert: {}, spinner: false };

const alert = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_ALERT: {
      return { ...state, alert: action.payload };
    }
    case types.REMOVE_ALL_ALERT:
      return { ...state, alert: {} };
    case types.SET_SPINNER:
      return { ...state, spinner: action.payload };

    default:
      return state;
  }
};

export default alert;
