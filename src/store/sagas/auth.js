import { put } from 'redux-saga/effects';
import AxiosInstance from '../../util/intercepter';
import * as authActions from '../actions/authActions';
import { REGISTER_URL, LOGIN_URL } from '../../configs/endpointConfig';
import axios from 'axios';

export function* loginUserSaga(action) {
  try {
    console.log(action.payload);
    const response = yield axios.post(LOGIN_URL, action.payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  } finally {
  }
}

export function* registerUserSaga(action) {
  const { email, password, emailConfirm, passwordConfirm, userLanguage } =
    action.data;
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('emailConfirmation', emailConfirm);
    formData.append('password', password);
    formData.append('passwordConfirmation', passwordConfirm);
    const response = AxiosInstance.post(REGISTER_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    yield;
  }
}
