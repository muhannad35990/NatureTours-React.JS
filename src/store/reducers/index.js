import { combineReducers } from "redux";
import alert from "./alert";
import authReducer from "./auth";
import tours from "./tours";
import reviews from "./review";
import users from "./userReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  tours,
  alert,
  reviews,
  users,
});

export default rootReducer;
