import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AutoHideAlert from "../alert/AutoHideAlert";
function ToursForm() {
  const { t } = useTranslation("words");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const alert = useSelector((state) => state.alert.alert);
  const spinner = useSelector((state) => state.alert.spinner);

  const TourSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("email_not_valid"))
      .required(t("Email_is_required")),
    password: Yup.string()
      .required(t("Password_is_required"))
      .min(6, t("Password_is_too_short")),
  });

  const initialValues = {
    email: "",
    password: "",
  };
  const doSubmit = () => {};
  return (
    <div className="navigation__model">
      <Formik
        initialValues={initialValues}
        validationSchema={TourSchema}
        onSubmit={doSubmit}
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
            <div className="form">
              <h1>{t("login")} </h1>
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
                    placeholder={t("Email")}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form__input"
                  />
                  <label htmlFor="email" className="form__label">
                    {t("Email")}
                  </label>
                  {errors.email && touched.email && (
                    <span className="form__error">{errors.email}</span>
                  )}
                </div>
                <div className="form__group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder={t("Email")}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form__input"
                  />
                  <label htmlFor="email" className="form__label">
                    {t("Email")}
                  </label>
                  {errors.email && touched.email && (
                    <span className="form__error">{errors.email}</span>
                  )}
                </div>
                <div className="form__group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder={t("Email")}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form__input"
                  />
                  <label htmlFor="email" className="form__label">
                    {t("Email")}
                  </label>
                  {errors.email && touched.email && (
                    <span className="form__error">{errors.email}</span>
                  )}
                </div>
                <div className="form__group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder={t("Email")}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form__input"
                  />
                  <label htmlFor="email" className="form__label">
                    {t("Email")}
                  </label>
                  {errors.email && touched.email && (
                    <span className="form__error">{errors.email}</span>
                  )}
                </div>
                <div className="form__group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder={t("Email")}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form__input"
                  />
                  <label htmlFor="email" className="form__label">
                    {t("Email")}
                  </label>
                  {errors.email && touched.email && (
                    <span className="form__error">{errors.email}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn--green"
                  style={{ marginTop: "5rem", marginBottom: "2rem" }}
                >
                  {spinner ? (
                    <LoadingOutlined style={{ fontSize: "2.5rem" }} spin />
                  ) : (
                    t("login")
                  )}
                </button>
              </form>
              <Link to="/forgotPassword">{`${t("forgot_password")}?`} </Link>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default ToursForm;
