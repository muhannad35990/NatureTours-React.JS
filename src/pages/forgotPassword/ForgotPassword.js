import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next'; // For translation

function ForgotPassword() {
  const { t } = useTranslation('words');
  const dispatch = useDispatch();
  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('email_not_valid'))
      .required(t('Email_is_required')),
  });

  const initialValues = {
    email: '',
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
            <h1>{`${t('forgot_password')}?`} </h1>
            <form onSubmit={handleSubmit}>
              <div className="form__group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={t('Email')}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form__input"
                />
                <label htmlFor="email" className="form__label">
                  {t('Email')}
                </label>
                {errors.email && touched.email && (
                  <span className="form__error">{errors.email}</span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn--green"
                style={{ marginTop: '5rem', marginBottom: '2rem' }}
              >
                {t('send')}
              </button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default ForgotPassword;
