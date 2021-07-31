import * as types from "../actions/types";
import history from "../../history";

const initialState = {
  loggedIn: false,
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_USER:
      return { ...state };
    case types.LOGIN_USER:
      return { ...state };
    case types.AUTO_LOGIN:
      return { ...state };
    case types.SET_USER_DATA:
      return { ...state, user: action.payload, loggedIn: true };
    case types.LOG_OUT:
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      history.push("login");
      return initialState;
    case types.FORGOT_PASSWORD:
      return { ...state };
    case types.RESET_PASSWORD:
      return { ...state };
    case types.UPDATE_PASSWORD:
      return { ...state };

    default:
      return state;
  }
};

export default reducer;
