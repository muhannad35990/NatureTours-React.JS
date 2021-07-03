import * as types from "../actions/types";

const initialState = { alert: {} };

const alert = (state = initialState, action) => {
  switch (action.type) {
    case types.SHOW_ALERT: {
      return { ...state, alert: action.payload };
    }
    case types.REMOVE_ALL_ALERT:
      return {};

    default:
      return state;
  }
};

export default alert;
