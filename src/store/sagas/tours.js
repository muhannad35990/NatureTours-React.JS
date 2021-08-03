import AxiosInstance from "../../util/intercepter";
import * as endpoints from "../../configs/endpointConfig";
import * as TourActions from "../actions/TourActions";
import { put } from "redux-saga/effects";

export function* getAllToursSaga() {
  const response = yield AxiosInstance.get(endpoints.TOURS, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  yield put(TourActions.setToursData(response.data.data.docs));
  console.log(response);
}
