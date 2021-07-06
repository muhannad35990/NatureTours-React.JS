import { put } from 'redux-saga/effects';
import * as authActions from '../actions/authActions';
import * as AlertActions from '../actions/AlertActions';
import * as userActions from '../actions/userActions';
import * as endpoints from '../../configs/endpointConfig';
import showNotification from '../../components/alert/Alert';
import AxiosInstance from '../../util/intercepter';

export function* updateMeSaga(action) {
  try {
    const fmData = new FormData();
    fmData.append('FirstName', action.payload.FirstName);
    fmData.append('LastName', action.payload.LastName);
    fmData.append('email', action.payload.email);

    const response = yield AxiosInstance.patch(endpoints.UPDATE_ME, fmData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (response.status === 200) {
      yield put(authActions.setUserData(response.data.user));
      yield put(
        AlertActions.showAlert({
          type: 'success',
          title: response.statusText,
          message: response.data.message,
        })
      );
      showNotification('success', 'Updated successfully', 'Success');
    } else {
      yield put(
        AlertActions.showAlert({
          title: response.statusText,
          message: response.data.message,
        })
      );
    }
  } catch (e) {
    if (e.response)
      yield put(
        AlertActions.showAlert({
          title: e.response.statusText,
          message: e.response.data.message,
        })
      );
    else {
      yield put(
        AlertActions.showAlert({
          title: 'Network Error',
          message:
            'Fail to Connect to the server! check your connection and try again',
        })
      );
    }
    // showNotification("error", e.response.data.message, "Error");
  }
}
