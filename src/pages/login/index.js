import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/actions/authActions";
import { Link, withRouter, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next"; // For translation
import { LoadingOutlined } from "@ant-design/icons";
import AutoHideAlert from "../../components/alert/AutoHideAlert";
import { removeAllAlerts, setSpiner } from "../../store/actions/AlertActions";
import InputPassword from "../../components/InputPassword/InputPassword";
import history1 from "../../history";
import { Divider } from "antd";
import AxiosInstance from "../../util/intercepter";
import * as endpoints from "../../configs/endpointConfig";

function Login() {
  const { t } = useTranslation("words");
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const alert = useSelector((state) => state.alert.alert);
  const spinner = useSelector((state) => state.alert.spinner);

  const SignInSchema = Yup.object().shape({
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
  useEffect(() => {
    dispatch(removeAllAlerts());
  }, []);

  useEffect(() => {
    if (auth.loggedIn) {
      if (history1.location.pathname && history1.location.pathname !== "/login")
        history.replace(history1.location.pathname);
      else history.replace("/");
    }
  }, [auth]);

  const dologin = (values) => {
    dispatch(setSpiner(true));
    dispatch(removeAllAlerts());
    dispatch(loginUser(values));
  };
  const loginWithGoogle = async () => {
    const response = await AxiosInstance.get(endpoints.GOOGLE_LOGIN);
    console.log(response);
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

              <div>
                <InputPassword
                  name="password"
                  id="password"
                  value={values.password}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  placeholder={t("password")}
                  label={t("password")}
                />
                {errors.password && touched.password && (
                  <span className="form__error">{errors.password}</span>
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
            <Divider>OR</Divider>
            <button
              type="button"
              className="login-with-google-btn"
              onClick={loginWithGoogle}
            >
              Sign in with Google
            </button>
          </div>
        );
      }}
    </Formik>
  );
}

export default withRouter(Login);
