import { put } from 'redux-saga/effects';
import * as authActions from '../actions/authActions';
import * as AlertActions from '../actions/AlertActions';
import * as endpoints from '../../configs/endpointConfig';
import axios from 'axios';
import showNotification from '../../components/alert/Alert';

export function* loginUserSaga(action) {
  try {
    const response = yield axios.post(endpoints.LOGIN_URL, action.payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(AlertActions.setSpiner(false));
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      yield put(authActions.setUserData(response.data.data.user));
    } else {
      yield put(
        AlertActions.showAlert({
          type: 'error',
          title: response.statusText,
          message: response.data.message,
        })
      );
    }
  } catch (e) {
    yield put(AlertActions.setSpiner(false));
    if (e.response)
      yield put(
        AlertActions.showAlert({
          type: 'error',
          title: e.response.statusText,
          message: e.response.data.message,
        })
      );
    else {
      yield put(
        AlertActions.showAlert({
          type: 'error',
          title: 'Network Error',
          message:
            'Fail to Connect to the server! check your connection and try again',
        })
      );
    }
    // showNotification("error", e.response.data.message, "Error");
  }
}

export function* registerUserSaga(action) {
  try {
    const response = yield axios.post(endpoints.REGISTER_URL, action.payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    yield put(AlertActions.setSpiner(false));
    if (response.status === 201) {
      localStorage.setItem('token', response.data.token);
      yield put(authActions.setUserData(response.data.data.user));
      yield put(
        AlertActions.showAlert({
          type: 'success',
          title: 'success',
          message: 'User created successfully',
        })
      );
      // showNotification('success', 'User created successfully', 'success');
    } else {
      yield put(
        AlertActions.showAlert({
          type: 'error',
          title: response.statusText,
          message: response.data.message,
        })
      );
    }
  } catch (e) {
    yield put(AlertActions.setSpiner(false));
    if (e.response)
      yield put(
        AlertActions.showAlert({
          type: 'error',
          title: e.response.statusText,
          message: e.response.data.message,
        })
      );
    else {
      yield put(
        AlertActions.showAlert({
          type: 'error',
          title: 'Network Error',
          message:
            'Fail to Connect to the server! check your connection and try again',
        })
      );
    }
  }
}
