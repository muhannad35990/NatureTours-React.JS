import AxiosInstance from "../../util/intercepter";
import * as endpoints from "../../configs/endpointConfig";
import * as ReviewActions from "../actions/ReviewActions";
import { put, select } from "redux-saga/effects";
import * as AlertActions from "../actions/AlertActions";
import showNotification from "../../components/alert/Alert";
import { getTourReviews } from "../actions/TourActions";
import i18n from "../../configs/internationalization/i18n";

export function* getAllReviewsSaga(action) {
  const response = yield AxiosInstance.get(`${endpoints.REVIEWS}`);
  if (response.status === 200)
    yield put(ReviewActions.setAllReviews(response.data.data.docs));
}

export function* getUserReviewsSaga(action) {
  const response = yield AxiosInstance.get(
    `${endpoints.USERS}/${action.payload}/reviews`
  );
  if (response.status === 200)
    yield put(ReviewActions.setUserReviews(response.data.data.docs));
}
export function* addNewReviewsSaga(action) {
  const data = action.payload.data;
  const response = yield AxiosInstance.post(
    `${endpoints.TOURS}/${action.payload.tourId}/reviews`,
    data
  );

  if (response.status === 201) {
    yield put(getTourReviews(action.payload.tourId));
    yield put(AlertActions.setSpiner(false));
    showNotification("success", i18n.t("Added_succssfully"), "Success");
  } else {
    yield put(
      AlertActions.showAlert({
        type: "error",
        title: "error",
        message: i18n.t("Cannt_add_more_than_one_review"),
      })
    );
  }
}
export function* updateUserReviewsSaga(action) {
  const response = yield AxiosInstance.patch(
    `${endpoints.REVIEWS}/${action.payload.reviewId}`,
    { review: action.payload.review, rating: action.payload.rating }
  );
  if (response.status === 200) {
    const auth = yield select((state) => state.auth);
    yield put(ReviewActions.GetUserReviews(auth.user._id));
    yield put(AlertActions.setSpiner(false));
    showNotification("success", i18n.t("Updated_succssfully"), "Success");
  }
}
export function* deleteReviewSaga(action) {
  const response = yield AxiosInstance.delete(
    `${endpoints.REVIEWS}/${action.payload}`
  );
  yield put(ReviewActions.getAllReviews());
  showNotification("success", i18n.t("Deleted_succssfully"), "Success");
}

export function* deleteUserReviewsSaga(action) {
  const response = yield AxiosInstance.delete(
    `${endpoints.REVIEWS}/${action.payload}`
  );
  const auth = yield select((state) => state.auth);
  yield put(ReviewActions.GetUserReviews(auth.user._id));
  yield put(AlertActions.setSpiner(false));
  showNotification("success", i18n.t("Deleted_succssfully"), "Success");
}
