import { combineReducers } from "redux";
import alert from "./alert";
import authReducer from "./auth";

const rootReducer = combineReducers({
  auth: authReducer,
  alert,
});

export default rootReducer;
