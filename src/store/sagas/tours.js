import AxiosInstance from "../../util/intercepter";
import * as endpoints from "../../configs/endpointConfig";
import * as TourActions from "../actions/TourActions";
import { put } from "redux-saga/effects";

export function* getAllToursSaga(action) {
  const filter = action.payload;
  const showAll = filter && filter.split("=")[1] === "";
  const url =
    filter && !showAll ? `${endpoints.TOURS}?${filter}` : endpoints.TOURS;
  const response = yield AxiosInstance.get(url, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  yield put(TourActions.setToursData(response.data.data.docs));
}
