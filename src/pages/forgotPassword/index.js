import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next"; // For translation
import { forgotPassword } from "../../store/actions/authActions";
import AutoHideAlert from "../../components/alert/AutoHideAlert";
import { removeAllAlerts, setSpiner } from "../../store/actions/AlertActions";
import { useHistory } from "react-router-dom";

function ForgotPassword() {
  const { t } = useTranslation("words");
  const dispatch = useDispatch();
  const history = useHistory();

  const spinner = useSelector((state) => state.alert.spinner);
  const alert = useSelector((state) => state.alert.alert);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(removeAllAlerts());
  }, []);

  useEffect(() => {
    if (auth.loggedIn) {
      history.push("/");
    }
  }, [auth]);
  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("email_not_valid"))
      .required(t("Email_is_required")),
  });

  const initialValues = {
    email: "",
  };

  const doSend = (values) => {
    dispatch(removeAllAlerts());
    dispatch(setSpiner(true));
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
            <h1>{`${t("forgot_password")}?`} </h1>
            {alert && alert.type && (
              <AutoHideAlert
                title={alert.title ? alert.title : "Error"}
                message={alert.message ? alert.message : ""}
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

              <button
                type="submit"
                className="btn btn--green"
                style={{ marginTop: "5rem", marginBottom: "2rem" }}
              >
                {spinner ? (
                  <LoadingOutlined style={{ fontSize: "2.5rem" }} spin />
                ) : (
                  t("send")
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
