
export function* registerUserSaga(action) {
  const { email, password, emailConfirm, passwordConfirm, userLanguage } =
    action.data;
  try {
    yield put(setActionState({ [action.type]: true }));
    const formData = new FormData();
    formData.append('email', email);
    formData.append('emailConfirmation', emailConfirm);
    formData.append('password', password);
    formData.append('passwordConfirmation', passwordConfirm);
    const response = yield AxiosInstance.post(REGISTER_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const isSuccess = response.data.user_id > 0;
    if (isSuccess) {
      yield put(
        authActions.authSuccess(response.data.user_id, response.data.email)
      );
      const GET_LICENSEresponse = yield AxiosInstance.get(GET_LICENSE);
      yield put(
        licenseCodeActions.setLicenseCode(GET_LICENSEresponse.data.license_key)
      );
      // Set the chosen language for the user
      yield put(settingsActions.updateChosenLanguage(userLanguage.id, false));
    } else {
      yield put(
        AlertActions.showAlert(
          4000,
          SHOW_ERROR_ALERT,
          i18n.t('user_or_password_incorrect'),
          true
        )
      );
      yield put(authActions.authFail(i18n.t('something_wrong')));
    }
  } catch (error) {
    yield put(
      
      )
    );
    yield put(authActions.authFail(i18n.t('error_while_logging')));
  } finally {
    yield  
  }
}
