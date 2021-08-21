import AxiosInstance from "../../util/intercepter";
import * as endpoints from "../../configs/endpointConfig";
import * as ReviewActions from "../actions/ReviewActions";
import { put, select } from "redux-saga/effects";
import * as AlertActions from "../actions/AlertActions";
import showNotification from "../../components/alert/Alert";

export function* getAllReviewsSaga(action) {
  const response = yield AxiosInstance.get(`${endpoints.REVIEWS}`);
  console.log(response);
  yield put(ReviewActions.setAllReviews(response.data.data.docs));
}

export function* getUserReviewsSaga(action) {
  const response = yield AxiosInstance.get(
    `${endpoints.USERS}/${action.payload}/reviews`
  );

  yield put(ReviewActions.setUserReviews(response.data.data.docs));
}
export function* updateUserReviewsSaga(action) {
  const response = yield AxiosInstance.patch(
    `${endpoints.REVIEWS}/${action.payload.reviewId}`,
    { review: action.payload.review, rating: action.payload.rating }
  );

  const auth = yield select((state) => state.auth);
  yield put(ReviewActions.GetUserReviews(auth.user._id));
  yield put(AlertActions.setSpiner(false));
  showNotification("success", "Updated succssfully!", "Success");
}

export function* deleteUserReviewsSaga(action) {
  const response = yield AxiosInstance.delete(
    `${endpoints.REVIEWS}/${action.payload}`
  );
  const auth = yield select((state) => state.auth);
  yield put(ReviewActions.GetUserReviews(auth.user._id));
  yield put(AlertActions.setSpiner(false));
  showNotification("success", "Deleted succssfully!", "Success");
}
