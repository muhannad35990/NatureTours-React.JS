import AxiosInstance from "../../util/intercepter";
import * as endpoints from "../../configs/endpointConfig";
import * as TourActions from "../actions/TourActions";
import { put } from "redux-saga/effects";

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
export function* getTourReviewsSaga(action) {
  const response = yield AxiosInstance.get(
    `${endpoints.TOURS}/${action.payload}/Reviews`
  );
  yield put(TourActions.setTourReviews(response.data.data.docs));
}
