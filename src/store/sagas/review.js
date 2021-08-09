import AxiosInstance from "../../util/intercepter";
import * as endpoints from "../../configs/endpointConfig";
import * as ReviewActions from "../actions/ReviewActions";
import { put } from "redux-saga/effects";

export function* getUserReviewsSaga(action) {
  const response = yield AxiosInstance.get(
    `${endpoints.USERS}/${action.payload}/reviews`
  );

  yield put(ReviewActions.setUserReviews(response.data.data.docs));
}
