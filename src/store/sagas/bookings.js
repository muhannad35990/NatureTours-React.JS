import AxiosInstance from "../../util/intercepter";
import * as endpoints from "../../configs/endpointConfig";
import * as BookingsActions from "../actions/BookingActions";
import { put } from "redux-saga/effects";
import showNotification from "../../components/alert/Alert";

export function* getAllBookingsSaga(action) {
  const response = yield AxiosInstance.get(
    `${endpoints.BOOKINGS}/${action.payload}`
  );
  yield put(BookingsActions.setAllBookings(response.data.data));
}
export function* getBookingSaga(action) {
  const response = yield AxiosInstance.get(
    `${endpoints.BOOKINGS}/${action.payload}`
  );
  yield put(BookingsActions.setBooking(response.data.data));
}
export function* getSessionSaga(action) {
  const response = yield AxiosInstance.get(
    `${endpoints.BOOKINGS}/checkout-session/${action.payload}`
  );
  yield put(BookingsActions.setCheckoutSession(response.data.data));
}

export function* updateBookingSaga(action) {
  const data = action.payload.data;
  const response = yield AxiosInstance.patch(
    `${endpoints.BOOKINGS}/${action.payload.bookingId}`,
    data
  );
  yield put(BookingsActions.getBooking(action.payload.bookingId));
  showNotification("success", "Updated succssfully!", "Success");
  yield put(BookingsActions.getAllBookings());
}

export function* deleteBookingSaga(action) {
  const response = yield AxiosInstance.delete(
    `${endpoints.BOOKINGS}/${action.payload}`
  );
  yield put(BookingsActions.getAllBookings());
  showNotification("success", "Deleted succssfully!", "Success");
}
