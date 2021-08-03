import { combineReducers } from "redux";
import alert from "./alert";
import authReducer from "./auth";
import tours from "./tours";
const rootReducer = combineReducers({
  auth: authReducer,
  tours,
  alert,
});

export default rootReducer;
