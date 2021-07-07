import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/actions/authActions';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // For translation
import { LoadingOutlined } from '@ant-design/icons';
import AutoHideAlert from '../../components/alert/AutoHideAlert';
import { removeAllAlerts, setSpiner } from '../../store/actions/AlertActions';

function Login() {
  const { t } = useTranslation('words');
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const alert = useSelector((state) => state.alert.alert);
  const spinner = useSelector((state) => state.alert.spinner);

  const history = useHistory();

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('email_not_valid'))
      .required(t('Email_is_required')),
    password: Yup.string()
      .required(t('Password_is_required'))
      .min(6, t('Password_is_too_short')),
  });

  const initialValues = {
    email: '',
    password: '',
  };
  useEffect(() => {
    dispatch(removeAllAlerts());
  }, []);
  useEffect(() => {
    if (auth.loggedIn) {
      auth.user.role === 'admin'
        ? history.push('/dashboard')
        : history.push('/userHome');
    }
  }, [auth]);

  const dologin = (values) => {
    dispatch(setSpiner(true));
    dispatch(removeAllAlerts());
    dispatch(loginUser(values));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={dologin}
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
            <h1>{t('login')} </h1>
            {alert && alert.type && (
              <AutoHideAlert
                title={alert.title}
                message={alert.message}
                type={alert.type}
                timeout={alert.timeout}
              />
            )}
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

              <div className="form__group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder={t('password')}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form__input"
                />
                <label htmlFor="password" className="form__label">
                  {t('password')}
                </label>
                {errors.password && touched.password && (
                  <span className="form__error">{errors.password}</span>
                )}
              </div>
              <button
                type="submit"
                className="btn btn--green"
                style={{ marginTop: '5rem', marginBottom: '2rem' }}
              >
                {spinner ? (
                  <LoadingOutlined style={{ fontSize: '2.5rem' }} spin />
                ) : (
                  t('login')
                )}
              </button>
            </form>
            <Link to="/forgotPassword">{`${t('forgot_password')}?`} </Link>
          </div>
        );
      }}
    </Formik>
  );
}

export default withRouter(Login);
