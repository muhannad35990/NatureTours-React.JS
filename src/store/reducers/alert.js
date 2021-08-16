import * as types from "../actions/types";

const initialState = { alert: {}, spinner: false, progress: null };

const alert = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_ALERT: {
      return { ...state, alert: action.payload };
    }
    case types.REMOVE_ALL_ALERT:
      return { ...state, alert: {} };
    case types.SET_SPINNER:
      return { ...state, spinner: action.payload };
    case types.SET_PROGRESS:
      return { ...state, progress: action.payload };
    case types.RESET_PROGRESS:
      return { ...state, progress: null };

    default:
      return state;
  }
};

export default alert;
