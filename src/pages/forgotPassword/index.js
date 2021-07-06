import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next'; // For translation
import { forgotPassword } from '../../store/actions/authActions';
import OnFormAlert from '../../components/alert/OnFormAlert';
import { removeAllAlerts, setSpiner } from '../../store/actions/AlertActions';

function ForgotPassword() {
  const { t } = useTranslation('words');
  const dispatch = useDispatch();
  const spinner = useSelector((state) => state.alert.spinner);

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('email_not_valid'))
      .required(t('Email_is_required')),
  });

  const initialValues = {
    email: '',
  };

  const doSend = (values) => {
    dispatch(removeAllAlerts());
    dispatch(setSpiner(true));
    console.log('values are:', values);
    dispatch(forgotPassword(values));
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
            {alert && alert.message && (
              <OnFormAlert
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

              <button
                type="submit"
                className="btn btn--green"
                style={{ marginTop: '5rem', marginBottom: '2rem' }}
              >
                {spinner ? (
                  <LoadingOutlined style={{ fontSize: '2.5rem' }} spin />
                ) : (
                  t('send')
                )}
              </button>
            </form>
          </div>
        );
      }}
    </Formik>
  );
}

export default ForgotPassword;
