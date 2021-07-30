import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { logUserOut, registerUser } from "../../store/actions/authActions";
import { useTranslation } from "react-i18next"; // For translation
import AutoHideAlert from "../../components/alert/AutoHideAlert";
import { LoadingOutlined } from "@ant-design/icons";
import { removeAllAlerts, setSpiner } from "../../store/actions/AlertActions";
import { useHistory } from "react-router-dom";
import InputPassword from "../../components/InputPassword/InputPassword";
function Register() {
  const { t } = useTranslation("words");
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const alert = useSelector((state) => state.alert.alert);
  const spinner = useSelector((state) => state.alert.spinner);
  const history = useHistory();

  const SignInSchema = Yup.object().shape({
    FirstName: Yup.string()
      .required(t("Firstname_is_required"))
      .min(2, t("too_short")),
    LastName: Yup.string()
      .required(t("Lastname_is_required"))
      .min(2, t("too_short")),
    email: Yup.string()
      .email(t("email_not_valid"))
      .required(t("Email_is_required")),
    password: Yup.string()
      .required(t("Password_is_required"))
      .min(6, t("Password_is_too_short")),
    passwordConfirm: Yup.string()
      .required(t("Password_confirm_required"))
      .min(6, t("Password_is_too_short"))
      .oneOf([Yup.ref("password"), null], t("Passwords_must_match")),
  });
  const initialValues = {
    FirstName: "",
    LastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  useEffect(() => {
    dispatch(removeAllAlerts());
    dispatch(logUserOut());
  }, []);
  useEffect(() => {
    if (auth.loggedIn) {
      auth.user.role === "admin"
        ? history.push("/dashboard")
        : history.push("/userHome");
    }
  }, [auth]);
  const signup = (values) => {
    dispatch(removeAllAlerts());
    dispatch(setSpiner(true));
    dispatch(registerUser(values));
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={SignInSchema}
        onSubmit={signup}
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
              <h1>{t("sign_up")}</h1>
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
                    type="text"
                    name="FirstName"
                    id="FirstName"
                    placeholder={t("firstname")}
                    value={values.FirstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form__input"
                  />
                  <label htmlFor="FirstName" className="form__label">
                    {t("firstname")}
                  </label>
                  {errors.FirstName && touched.FirstName && (
                    <span className="form__error">{errors.FirstName}</span>
                  )}
                </div>
                <div className="form__group">
                  <input
                    type="text"
                    name="LastName"
                    id="LastName"
                    placeholder={t("lastname")}
                    value={values.LastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form__input"
                  />
                  <label htmlFor="LastName" className="form__label">
                    {t("lastname")}
                  </label>
                  {errors.LastName && touched.LastName && (
                    <span className="form__error">{errors.LastName}</span>
                  )}
                </div>
                <div className="form__group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder={t("email")}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form__input"
                  />
                  <label htmlFor="email" className="form__label">
                    {t("email")}
                  </label>
                  {errors.email && touched.email && (
                    <span className="form__error">{errors.email}</span>
                  )}
                </div>

                <div className="form__group">
                  <InputPassword
                    name="password"
                    id="password"
                    placeholder={t("password")}
                    value={values.password}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />
                  <label htmlFor="password" className="form__label">
                    {t("password")}
                  </label>
                  {errors.password && touched.password && (
                    <span className="form__error">{errors.password}</span>
                  )}
                </div>
                <div className="form__group">
                  <InputPassword
                    name="passwordConfirm"
                    id="passwordConfirm"
                    placeholder={t("passwordConfirm")}
                    value={values.passwordConfirm}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                  />

                  <label htmlFor="passwordConfirm" className="form__label">
                    {t("passwordConfirm")}
                  </label>
                  {errors.passwordConfirm && touched.passwordConfirm && (
                    <span className="form__error">
                      {errors.passwordConfirm}
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn--green"
                  style={{ marginTop: "3rem" }}
                >
                  {spinner ? (
                    <LoadingOutlined style={{ fontSize: "2.5rem" }} spin />
                  ) : (
                    t("submit")
                  )}
                </button>
              </form>
            </div>
          );
        }}
      </Formik>
    </>
  );
}

export default Register;
