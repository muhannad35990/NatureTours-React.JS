import { Col, Popconfirm, Rate, Row } from "antd";
import Form from "antd/lib/form/Form";
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
import {
  DeleteUserReview,
  GetUserReviews,
} from "../../../store/actions/ReviewActions";

function ReviewModel({ show, onCancel, record }) {
  const alert = useSelector((state) => state.alert.alert);
  const spinner = useSelector((state) => state.alert.spinner);
  const auth = useSelector((state) => state.auth);
  const [isDeleteSpinner, setIsDeleteSpinner] = useState(false);

  const { t } = useTranslation("words");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeAllAlerts());
  }, []);

  const reviewModelSchema = Yup.object().shape({
    review: Yup.string()
      .required(t("review_is_required"))
      .min(5, t("review_is_too_short")),
    rating: Yup.number().required("rating is required").min(1).max(5),
  });
  const initialValues = { review: record?.review, rating: record?.rating };
  const doUpdateReview = async (values) => {
    dispatch(removeAllAlerts());
    dispatch(setSpiner(true));
    // dispatch(updatePassword(values));
  };
  const doTheDelete = () => {
    //delete review from the database
    setIsDeleteSpinner(true);
    dispatch(setSpiner(true));
    dispatch(DeleteUserReview(record.id));
    dispatch(GetUserReviews(auth.user._id));
  };

  return (
    record !== null &&
    record.tour !== null && (
      <Modal
        visible={show}
        title={record.tour.name}
        footer={null}
        onCancel={onCancel}
        destroyOnClose={true}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={reviewModelSchema}
          onSubmit={doUpdateReview}
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
                  <textarea
                    type="text"
                    name="review"
                    id="review"
                    rows="5"
                    placeholder="Your review"
                    value={values.review}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form__input"
                  />
                  <label htmlFor="email" className="form__label">
                    Review
                  </label>
                  {errors.email && touched.email && (
                    <span className="form__error">{errors.review}</span>
                  )}
                </div>
                <Rate allowHalf value={record.rating} />
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

export default ReviewModel;
