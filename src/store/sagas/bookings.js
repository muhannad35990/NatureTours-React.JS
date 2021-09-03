import AxiosInstance from "../../util/intercepter";
import * as endpoints from "../../configs/endpointConfig";
import * as BookingsActions from "../actions/BookingActions";
import { put } from "redux-saga/effects";
import showNotification from "../../components/alert/Alert";
import i18n from "../../configs/internationalization/i18n";

export function* getAllBookingsSaga(action) {
  const response = yield AxiosInstance.get(`${endpoints.BOOKINGS}`);
  if (response.status === 200)
    yield put(BookingsActions.setAllBookings(response.data.data.docs));
}
export function* getBookingSaga(action) {
  const response = yield AxiosInstance.get(
    `${endpoints.BOOKINGS}/${action.payload}`
  );
  if (response.status === 200)
    yield put(BookingsActions.setBooking(response.data.data));
}
export function* getSessionSaga(action) {
  const response = yield AxiosInstance.post(
    `${endpoints.BOOKINGS}/checkout-session/${action.payload}`
  );
  if (response.status === 200) {
    window.location.href = response.data.session.url;
  }
}

export function* updateBookingSaga(action) {
  const data = action.payload.data;
  const response = yield AxiosInstance.patch(
    `${endpoints.BOOKINGS}/${action.payload.bookingId}`,
    data
  );
  if (response.status === 200)
    yield put(BookingsActions.getBooking(action.payload.bookingId));
  showNotification("success", i18n.t("Updated_succssfully"), "Success");
  yield put(BookingsActions.getAllBookings());
}

export function* deleteBookingSaga(action) {
  const response = yield AxiosInstance.delete(
    `${endpoints.BOOKINGS}/${action.payload}`
  );

  yield put(BookingsActions.getAllBookings());
  showNotification("success", i18n.t("Deleted_succssfully"), "Success");
}
export function* getMyBookingsSaga(action) {
  const response = yield AxiosInstance.get(
    `${endpoints.USERS}/${action.payload}/Bookings`
  );
  if (response.status === 200)
    yield put(BookingsActions.setMyBookings(response.data.data.docs));
}
