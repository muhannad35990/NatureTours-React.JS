import { combineReducers } from "redux";
import alert from "./alert";
import authReducer from "./auth";
import tours from "./tours";
import reviews from "./review";
import users from "./userReducer";
import bookings from "./bookings";
const rootReducer = combineReducers({
  auth: authReducer,
  tours,
  alert,
  reviews,
  users,
  bookings,
});

export default rootReducer;
