import { Col, Popconfirm, Rate, Row, Select } from "antd";
import Modal from "antd/lib/modal/Modal";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeAllAlerts,
  setSpiner,
} from "../../../store/actions/AlertActions";
import AutoHideAlert from "../../alert/AutoHideAlert";
import * as Yup from "yup";
import { useTranslation } from "react-i18next"; // For translation
import {
  DeleteOutlined,
  LoadingOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import { Option } from "antd/lib/mentions";
import {
  deleteUser,
  GetAllUsers,
  updateUser,
} from "../../../store/actions/userActions";

function UserModel({ show, onCancel, record }) {
  const alert = useSelector((state) => state.alert.alert);
  const spinner = useSelector((state) => state.alert.spinner);

  const [isDeleteSpinner, setIsDeleteSpinner] = useState(false);
  const [selectval, setSelectval] = useState(record?.role);
  const { t } = useTranslation("words");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeAllAlerts());
    setSelectval(record?.role);
  }, [record]);
  const roles = ["user", "guide", "lead-guide", "admin"];
  const userModelSchema = Yup.object().shape({
    name: Yup.string()
      .required(t("Firstname_is_required"))
      .min(2, t("too_short")),

    email: Yup.string()
      .email(t("email_not_valid"))
      .required(t("Email_is_required")),
  });
  const initialuserModelValues = {
    name: record?.name,
    email: record?.email,
  };
  const doUpdateUser = async (values) => {
    values = {
      name: values.name,
      email: values.email,
      role: selectval,
      userId: record._id,
    };

    dispatch(removeAllAlerts());
    dispatch(setSpiner(true));
    dispatch(updateUser(values));
  };
  const doTheDelete = () => {
    //delete review from the database
    setIsDeleteSpinner(true);
    dispatch(setSpiner(true));
    dispatch(deleteUser(record._id));
    dispatch(GetAllUsers());
  };

  return (
    record !== null && (
      <Modal
        visible={show}
        title={record.name}
        footer={null}
        onCancel={onCancel}
        destroyOnClose={true}
      >
        <Formik
          initialValues={initialuserModelValues}
          validationSchema={userModelSchema}
          onSubmit={doUpdateUser}
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
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form__input"
                  />
                  <label htmlFor="name" className="form__label">
                    name
                  </label>
                  {errors.name && touched.name && (
                    <span className="form__error">{errors.name}</span>
                  )}
                </div>
                <div className="form__group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form__input"
                  />
                  <label htmlFor="email" className="form__label">
                    email
                  </label>
                  {errors.email && touched.email && (
                    <span className="form__error">{errors.email}</span>
                  )}
                </div>
                <div className="form__group">
                  <label htmlFor="role" className="form__label">
                    Role
                  </label>
                  <Select
                    name="role"
                    id="role"
                    type="text"
                    value={selectval}
                    style={{ width: 200 }}
                    onChange={(val) => setSelectval(val)}
                    onBlur={handleBlur}
                  >
                    {roles.map((val) => (
                      <Option key={val} value={val}>
                        {val}
                      </Option>
                    ))}
                  </Select>
                </div>

                <Row>
                  <Col span={12}>
                    <button
                      type="submit"
                      className="btn btn--green"
                      style={{ marginTop: "3rem" }}
                    >
                      {spinner && !isDeleteSpinner ? (
                        <LoadingOutlined style={{ fontSize: "2.5rem" }} spin />
                      ) : (
                        <div>
                          <SaveOutlined
                            style={{
                              fontSize: "1.6rem",
                              marginRight: "1rem",
                            }}
                          />
                          <span>SAVE</span>
                        </div>
                      )}
                    </button>
                  </Col>
                  <Col span={12}>
                    <Popconfirm
                      title="Are you sure to delete this review?"
                      onConfirm={doTheDelete}
                      okText="Yes"
                      cancelText="No"
                      key="popUp"
                    >
                      <button
                        type="submit"
                        className="btn btn--red"
                        style={{ marginTop: "3rem" }}
                      >
                        {spinner && isDeleteSpinner ? (
                          <LoadingOutlined
                            style={{ fontSize: "2.5rem" }}
                            spin
                          />
                        ) : (
                          <div>
                            <DeleteOutlined
                              style={{
                                fontSize: "1.6rem",
                                marginRight: "1rem",
                              }}
                            />
                            <span>DELETE</span>
                          </div>
                        )}
                      </button>
                    </Popconfirm>
                  </Col>
                </Row>
              </form>
            );
          }}
        </Formik>
      </Modal>
    )
  );
}

export default UserModel;
