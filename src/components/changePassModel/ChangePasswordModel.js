import { Col, Row } from "antd";
import Form from "antd/lib/form/Form";
import Modal from "antd/lib/modal/Modal";
import { Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAllAlerts, setSpiner } from "../../store/actions/AlertActions";
import AutoHideAlert from "../alert/AutoHideAlert";
import InputPassword from "../InputPassword/InputPassword";
import * as Yup from "yup";
import { useTranslation } from "react-i18next"; // For translation
import { LoadingOutlined } from "@ant-design/icons";
import { updatePassword } from "../../store/actions/authActions";

function ChangePasswordModel({ show, onCancel }) {
  const alert = useSelector((state) => state.alert.alert);
  const spinner = useSelector((state) => state.alert.spinner);
  const { t } = useTranslation("words");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeAllAlerts());
  }, []);

  const PasswordModelSchema = Yup.object().shape({
    passwordCurrent: Yup.string()
      .required(t("Password_is_required"))
      .min(8, t("Password_is_too_short")),
    password: Yup.string()
      .required(t("Password_is_required"))
      .min(8, t("Password_is_too_short")),

    passwordConfirm: Yup.string()
      .required(t("Password_is_required"))
      .min(8, t("Password_is_too_short"))
      .oneOf([Yup.ref("password"), null], t("Passwords_must_match")),
  });
  const initialValues = {};
  const doUpdatePassword = async (values) => {
    dispatch(removeAllAlerts());
    dispatch(setSpiner(true));
    dispatch(updatePassword(values));
  };
  return (
    <Modal
      visible={show}
      title="Change current password "
      footer={null}
      onCancel={onCancel}
      destroyOnClose={true}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={PasswordModelSchema}
        onSubmit={doUpdatePassword}
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
            <form onSubmit={handleSubmit}>
              <Row justify="center">
                <Col span={24}>
                  {alert && alert.message && (
                    <AutoHideAlert
                      title={alert.title}
                      message={alert.message}
                      type={alert.type}
                      timeout={alert.timeout}
                    />
                  )}
                </Col>
              </Row>
              <div className="form__group">
                <InputPassword
                  name="passwordCurrent"
                  id="passwordCurrent"
                  value={values.passwordCurrent}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <label htmlFor="passwordCurrent" className="form__label">
                  Current Password
                </label>
                {errors.passwordCurrent && touched.passwordCurrent && (
                  <span className="form__error">{errors.passwordCurrent}</span>
                )}
              </div>
              <div className="form__group">
                <InputPassword
                  name="password"
                  id="password"
                  value={values.password}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <label htmlFor="password" className="form__label">
                  New Password
                </label>
                {errors.password && touched.password && (
                  <span className="form__error">{errors.password}</span>
                )}
              </div>
              <div className="form__group">
                <InputPassword
                  name="passwordConfirm"
                  id="passwordConfirm"
                  value={values.passwordConfirm}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <label htmlFor="passwordConfirm" className="form__label">
                  New Password Confirm
                </label>
                {errors.passwordConfirm && touched.passwordConfirm && (
                  <span className="form__error">{errors.passwordConfirm}</span>
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
                  "Change"
                )}
              </button>
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
}

export default ChangePasswordModel;
