import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next'; // For translation

function ResetPassword() {
  const { t } = useTranslation('words');
  const dispatch = useDispatch();
  const SignInSchema = Yup.object().shape({
    password: Yup.string()
      .required(t('Password_is_required'))
      .min(6, t('Password_is_too_short')),
    passwordConfirm: Yup.string()
      .required(t('Password_confirm_required'))
      .min(6, t('Password_is_too_short'))
      .oneOf([Yup.ref('password'), null], t('Passwords_must_match')),
  });

  const initialValues = {
    password: '',
    passwordConfirm: '',
  };

  const doSend = (values) => {
    //   dispatch(loginUser(values));
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={doSend}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          <div data-aos="zoom-in-up" className="form">
            <h1>{`${t('reset_password')}`} </h1>
            <form onSubmit={handleSubmit}>
              <div className="form__group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder={`new ${t('password')}`}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form__input"
                />
                <label htmlFor="password" className="form__label">
                  {`new ${t('password')}`}
                </label>
                {errors.password && touched.password && (
                  <span className="form__error">{errors.password}</span>
                )}
              </div>
              <div className="form__group">
                <input
                  type="passwordConfirm"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  placeholder={t('passwordConfirm')}
                  value={values.passwordConfirm}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form__input"
                />
                <label htmlFor="passwordConfirm" className="form__label">
                  {t('passwordConfirm')}
                </label>
                {errors.passwordConfirm && touched.passwordConfirm && (
                  <span className="form__error">{errors.passwordConfirm}</span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn--green"
                style={{ marginTop: '5rem', marginBottom: '2rem' }}
              >
                {t('submit')}
              </button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default ResetPassword;
