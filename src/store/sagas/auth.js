import { put } from 'redux-saga/effects';
import AxiosInstance from '../../util/intercepter';
import * as authActions from '../actions/authActions';
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

    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      yield put(authActions.setUserData(response.data.data.user));
    } else {
      showNotification('error', response.data.message, 'Error');
    }
  } catch (e) {
    showNotification('error', e.response.data.message, 'Error');
  }
}

export function* registerUserSaga(action) {
  try {
    console.log(action);
    const response = yield axios.post(endpoints.REGISTER_URL, action.payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      localStorage.setItem('token', response.data.token);
      yield put(authActions.setUserData(response.data.data.user));
    } else {
      showNotification('error', response.data.message, 'Error');
    }
  } catch (e) {
    showNotification('error', e.response.data.message, 'Error');
  }
}
