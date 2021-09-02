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
  if (response.status === 200)
    yield put(TourActions.setToursData(response.data.data.docs));
}

export function* getTourSaga(action) {
  const response = yield AxiosInstance.get(
    `${endpoints.TOURS}/${action.payload}`
  );
  if (response.status === 200)
    yield put(TourActions.setTour(response.data.data));
}
export function* insertNewTourSaga(action) {
  const response = yield AxiosInstance.post(
    `${endpoints.TOURS}`,
    action.payload
  );
  if (response.status === 201)
    yield put(TourActions.setTour(response.data.data.doc));
  showNotification("success", "Updated succssfully!", "Success");
  yield put(TourActions.getAllTours());
}
export function* updateTourSaga(action) {
  const data = action.payload.data;
  const response = yield AxiosInstance.patch(
    `${endpoints.TOURS}/${action.payload.tourId}`,
    data
  );
  if (response.status === 200)
    yield put(TourActions.getTour(action.payload.tourId));
  showNotification("success", "Updated succssfully!", "Success");
  yield put(TourActions.getAllTours());
}
export function* deleteTourSaga(action) {
  const response = yield AxiosInstance.delete(
    `${endpoints.TOURS}/${action.payload}`
  );
  yield put(TourActions.getAllTours());
  showNotification("success", "Deleted succssfully!", "Success");
}
export function* insertTourLocationSaga(action) {
  const data = action.payload.data;
  const response = yield AxiosInstance.post(
    `${endpoints.TOURS}/location/${action.payload.tourId}`,
    data
  );
  if (response.status === 201)
    yield put(TourActions.getTour(action.payload.tourId));
  showNotification("success", "Updated succssfully!", "Success");
  yield put(TourActions.getAllTours());
}
export function* deleteTourLocationSaga(action) {
  const data = action.payload.data;
  const response = yield AxiosInstance.delete(
    `${endpoints.TOURS}/location/${action.payload.tourId}/${data}`
  );

  yield put(TourActions.getTour(action.payload.tourId));
  showNotification("success", "Deleted succssfully!", "Success");
  yield put(TourActions.getAllTours());
}

export function* getTourReviewsSaga(action) {
  const response = yield AxiosInstance.get(
    `${endpoints.TOURS}/${action.payload}/Reviews`
  );
  if (response.status === 200)
    yield put(TourActions.setTourReviews(response.data.data.docs));
}
export function* getTop5CheapSaga(action) {
  const response = yield AxiosInstance.get(`${endpoints.TOURS}/top-5-cheap`);
  if (response.status === 200)
    yield put(TourActions.setToursData(response.data.data.docs));
}
export function* getTop5ExpenseSaga(action) {
  const response = yield AxiosInstance.get(`${endpoints.TOURS}/top-5-expense`);
  if (response.status === 200)
    yield put(TourActions.setToursData(response.data.data.docs));
}
export function* getToursByDistanceSaga(action) {
  const response = yield AxiosInstance.get(
    `${endpoints.TOURS}/tours-within/${action.payload.distance}/center/${action.payload.lng},${action.payload.lat}/unit/${action.payload.unit}`
  );

  if (response.status === 200)
    yield put(TourActions.setToursData(response.data.data.data));
}
export function* getTourStatisticsSaga(action) {
  const response = yield AxiosInstance.get(`${endpoints.TOURS}/tour-stats`);

  if (response.status === 200)
    yield put(TourActions.setTourStatistics(response.data.data.stats));
}
