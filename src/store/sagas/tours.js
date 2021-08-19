import AxiosInstance from "../../util/intercepter";
import * as endpoints from "../../configs/endpointConfig";
import * as TourActions from "../actions/TourActions";
import { put } from "redux-saga/effects";
import showNotification from "../../components/alert/Alert";

export function* getAllToursSaga(action) {
  const filter = action.payload;
  const showAll = filter && filter.split("=")[1] === "";
  const url =
    filter && !showAll ? `${endpoints.TOURS}?${filter}` : endpoints.TOURS;
  const response = yield AxiosInstance.get(url);
  yield put(TourActions.setToursData(response.data.data.docs));
}

export function* getTourSaga(action) {
  const response = yield AxiosInstance.get(
    `${endpoints.TOURS}/${action.payload}`
  );
  yield put(TourActions.setTour(response.data.data));
}
export function* insertNewTourSaga(action) {
  const response = yield AxiosInstance.post(
    `${endpoints.TOURS}`,
    action.payload
  );
  yield put(TourActions.getAllTours());
}
export function* updateTourSaga(action) {
  const data = action.payload.data;
  const response = yield AxiosInstance.patch(
    `${endpoints.TOURS}/location/${action.payload.tourId}`,
    data
  );
  yield put(TourActions.getTour(action.payload.tourId));
  showNotification("success", "Updated succssfully!", "Success");
  yield put(TourActions.getAllTours());
}
export function* deleteTourSaga(action) {
  const response = yield AxiosInstance.delete(
    `${endpoints.TOURS}/${action.payload.tourId}`
  );
  yield put(TourActions.getAllTours());
  showNotification("success", "Deleted succssfully!", "Success");
}

export function* getTourReviewsSaga(action) {
  const response = yield AxiosInstance.get(
    `${endpoints.TOURS}/${action.payload}/Reviews`
  );

  yield put(TourActions.setTourReviews(response.data.data.docs));
}
