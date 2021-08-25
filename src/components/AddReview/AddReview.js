import {
  DeleteOutlined,
  LoadingOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as endpoints from "../../configs/endpointConfig";
import { removeAllAlerts, setSpiner } from "../../store/actions/AlertActions";
import * as Yup from "yup";
import { Formik } from "formik";
import AutoHideAlert from "../alert/AutoHideAlert";
import { Col, Rate, Row, Space } from "antd";
import { addNewTourReview } from "../../store/actions/ReviewActions";

function AddReview({ tour }) {
  const backendImg = `${endpoints.BACKEND_URL}/img/tours/`;
  const alert = useSelector((state) => state.alert.alert);
  const spinner = useSelector((state) => state.alert.spinner);
  const auth = useSelector((state) => state.auth);
  const [isDeleteSpinner, setIsDeleteSpinner] = useState(false);
  const [rate, setRate] = useState(1);

  const { t } = useTranslation("words");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeAllAlerts());
  }, []);

  const reviewModelSchema = Yup.object().shape({
    review: Yup.string()
      .required(t("review_is_required"))
      .min(5, t("review_is_too_short")),
  });
  const initialValues = { review: "" };
  const doAddReview = async (values) => {
    values = { review: values.review, rating: rate };
    dispatch(removeAllAlerts());
    dispatch(setSpiner(true));
    dispatch(addNewTourReview({ data: values, tourId: tour.id }));
  };
  return (
    <section className="formsection">
      <div
        className="book__form"
        style={{
          backgroundImage: `linear-gradient(
      105deg,
      rgba(255, 255, 255, .9) 0%,
      rgba(255, 255, 255, .5) 50%,
      transparent 50%
    ),
    url('${backendImg}${tour.imageCover}')`,
        }}
      >
        <h1
          className="details__mainTitle"
          style={{ fontSize: "3rem", marginLeft: "1rem" }}
        >
          Write review about this tour
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={reviewModelSchema}
          onSubmit={doAddReview}
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
              <Row justify="left">
                <Col span={11}>
                  <form onSubmit={handleSubmit}>
                    <Row justify="left">
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
                        style={{ backgroundColor: " #fff" }}
                      />
                      <label htmlFor="review" className="form__label">
                        Review
                      </label>
                      {errors.review && touched.review && (
                        <span className="form__error">{errors.review}</span>
                      )}
                    </div>
                    <div style={{ margin: "1rem 0" }}>
                      <Rate
                        allowHalf
                        name="rating"
                        id="rating"
                        value={rate}
                        onChange={(val) => setRate(val)}
                      />
                    </div>
                    <Row>
                      <Col span={12}>
                        <button
                          type="submit"
                          className="btn btn--green"
                          style={{ marginTop: "3rem" }}
                        >
                          {spinner ? (
                            <LoadingOutlined
                              style={{ fontSize: "2.5rem" }}
                              spin
                            />
                          ) : (
                            <div>
                              <span>Submit</span>
                            </div>
                          )}
                        </button>
                      </Col>
                    </Row>
                  </form>
                </Col>
              </Row>
            );
          }}
        </Formik>
      </div>
    </section>
  );
}

export default AddReview;
