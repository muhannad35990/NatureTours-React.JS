import { combineReducers } from "redux";
import alert from "./alert";
import authReducer from "./auth";
import tours from "./tours";
import reviews from "./review";
const rootReducer = combineReducers({
  auth: authReducer,
  tours,
  alert,
  reviews,
});

export default rootReducer;
