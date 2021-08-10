import AxiosInstance from "../../util/intercepter";
import * as endpoints from "../../configs/endpointConfig";
import * as ReviewActions from "../actions/ReviewActions";
import { put, select } from "redux-saga/effects";
import * as AlertActions from "../actions/AlertActions";
import showNotification from "../../components/alert/Alert";

export function* getUserReviewsSaga(action) {
  const response = yield AxiosInstance.get(
    `${endpoints.USERS}/${action.payload}/reviews`
  );

  yield put(ReviewActions.setUserReviews(response.data.data.docs));
}
export function* updateUserReviewsSaga(action) {
  const response = yield AxiosInstance.patch(
    `${endpoints.REVIEWS}/${action.payload}`
  );

  yield put(ReviewActions.setUserReviews(response.data.data.docs));
  yield put(
    AlertActions.showAlert({
      type: "success",
      title: response.statusText,
      message: "Updated successfully",
    })
  );
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
