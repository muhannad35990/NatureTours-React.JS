import {
  Button,
  Col,
  Image,
  Popconfirm,
  Progress,
  Rate,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import Modal from "antd/lib/modal/Modal";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Draggable from "react-draggable";
import {
  removeAllAlerts,
  reSetProgress,
  setProgress,
  setSpiner,
} from "../../../store/actions/AlertActions";
import AutoHideAlert from "../../alert/AutoHideAlert";
import * as Yup from "yup";
import { useTranslation } from "react-i18next"; // For translation
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  LoadingOutlined,
  PlusOutlined,
  SaveOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";

import {
  deleteUser,
  GetAllUsers,
  updateUser,
} from "../../../store/actions/userActions";
import * as endpoints from "../../../configs/endpointConfig";
import AxiosInstance from "../../../util/intercepter";
import showNotification from "../../alert/Alert";
import Avatar from "antd/lib/avatar/avatar";
import {
  getAllTours,
  getTour,
  setTour,
  updateTour,
} from "../../../store/actions/TourActions";
import DraggableModel from "../DraggableModel";

function TourModel({ show, onCancel, record }) {
  const tour = useSelector((state) => state.tours.tour);
  const alert = useSelector((state) => state.alert.alert);
  const progess = useSelector((state) => state.alert.progess);
  const spinner = useSelector((state) => state.alert.spinner);
  const [isDeleteSpinner, setIsDeleteSpinner] = useState(false);
  const [newCoverImage, setNewCoverImage] = useState(null);
  const auth = useSelector((state) => state.auth);

  const [fileList, setFileList] = useState([]);
  const [imagePreview, SetImagePreview] = useState({});
  const { t } = useTranslation("words");
  const dispatch = useDispatch();
  const tourImgBackend = `${endpoints.BACKEND_URL}/img/tours`;

  useEffect(() => {
    dispatch(setTour(record));
  }, [record]);

  useEffect(() => {
    dispatch(removeAllAlerts());
    if (tour) {
      const images = tour.images;
      const modimages = [];
      if (images.length > 0) {
        images.forEach((img) => {
          modimages.push({
            tourId: tour.id,
            url: `${tourImgBackend}/${img}`,
            name: img,
          });
        });
      }
      setFileList(modimages);
    }
  }, [tour?.images]);

  const doUpdateTour = async (values) => {
    dispatch(removeAllAlerts());
    dispatch(setSpiner(true));
  };
  const uploadImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        dispatch(setProgress(percent));
        if (percent === 100) {
          setTimeout(() => dispatch(reSetProgress()), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append("images", file);

    await AxiosInstance.patch(
      `${endpoints.TOURS}/${tour.id}`,
      fmData,
      config
    ).then((response) => {
      onSuccess("Ok");
      dispatch(getTour(tour.id));
    });
  };

  const uploadCoverImage = async (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      },
    };
    fmData.append("imageCover", file);

    await AxiosInstance.patch(
      `${endpoints.TOURS}/${tour.id}`,
      fmData,
      config
    ).then((response) => {
      dispatch(getTour(tour.id));
      onSuccess("Ok");
    });
  };
  const handleCoverImageOnChange = ({ file }) => {
    setNewCoverImage(file);
  };
  const handlePreview = (image) => {
    SetImagePreview({
      previewImage: image.url,
      previewVisible: true,
      previewTitle: "Tour image",
    });
  };
  const handleCoverPreview = () => {
    SetImagePreview({
      previewImage: `${tourImgBackend}/${tour.imageCover}`,
      previewVisible: true,
      previewTitle: "Tour Cover image",
    });
  };
  const handleCancelPreview = () => {
    dispatch(getAllTours());
    SetImagePreview({ previewVisible: false });
  };

  const tourModelSchema = Yup.object().shape({
    name: Yup.string()
      .required(t("Firstname_is_required"))
      .min(2, t("too_short")),

    email: Yup.string()
      .email(t("email_not_valid"))
      .required(t("Email_is_required")),
  });
  const initialTourModelValues = {
    name: tour?.name,
    email: tour?.email,
  };
  const doTourDelete = () => {};

  const handleDeleteTourImage = async (file) => {
    dispatch(removeAllAlerts());
    await AxiosInstance.delete(
      `${endpoints.TOURS}/${tour.id}/${file.name}`
    ).then((response) => {
      dispatch(getTour(tour.id));
    });
  };
  const handleChange = () => {
    setFileList(fileList);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    tour !== null && (
      <DraggableModel
        name={tour.name}
        visible={show}
        onCancel={onCancel}
        width={1000}
      >
        <div
          className="header"
          style={{
            marginTop: "-2.5rem",
            height: "30rem",
            backgroundImage: `linear-gradient(to right bottom,
            hsla(111, 55%, 64%, 0.8),
            hsla(160, 64%, 43%, 0.8)), url('${tourImgBackend}/${tour.imageCover}')`,
            backgroundSize: "cover",
            backgroundBlendMode: "screen",
          }}
        >
          <div className="header__content">
            <h4 className="header__heading " style={{ fontSize: "4rem" }}>
              <span className="rotatecard__heading-span rotatecard__heading-span--1">
                {tour.name}
              </span>
            </h4>
          </div>
        </div>
        <div className="changeCoverImageBtn">
          <Upload
            accept="image/*"
            showUploadList={false}
            handleChange={handleCoverImageOnChange}
            customRequest={uploadCoverImage}
          >
            <div>
              <Button
                className="circleButton"
                icon={<EditOutlined className="btnIcon" />}
              />
            </div>
          </Upload>
        </div>
        <div className="previewImageBtn">
          <Button
            className="circleButton"
            icon={<EyeOutlined className="btnIcon" />}
            onClick={handleCoverPreview}
          />
        </div>
        <Row justify="center">
          <Space>
            <div style={{ display: "flex" }}>
              <Upload
                listType="picture-card"
                accept="image/*"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={handleDeleteTourImage}
                customRequest={uploadImage}
              >
                {fileList.length >= 3 ? null : uploadButton}
              </Upload>
            </div>
          </Space>
          <Modal
            visible={imagePreview.previewVisible}
            title={imagePreview.previewTitle}
            footer={null}
            onCancel={handleCancelPreview}
          >
            <img
              alt="tour image"
              style={{ width: "100%" }}
              src={imagePreview.previewImage}
            />
          </Modal>
        </Row>
        <Formik
          initialValues={initialTourModelValues}
          validationSchema={tourModelSchema}
          onSubmit={doUpdateTour}
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
                <Row gutter={[32, 24]}>
                  <Col span={12}>
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
                  </Col>
                  <Col span={12}>
                    <div className="form__group">
                      <input
                        type="text"
                        name="duration"
                        id="duration"
                        placeholder="duration"
                        value={values.duration}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form__input"
                      />
                      <label htmlFor="duration" className="form__label">
                        duration
                      </label>
                      {errors.duration && touched.duration && (
                        <span className="form__error">{errors.duration}</span>
                      )}
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="form__group">
                      <input
                        type="text"
                        name="difficulty"
                        id="difficulty"
                        placeholder="difficulty"
                        value={values.difficulty}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form__input"
                      />
                      <label htmlFor="difficulty" className="form__label">
                        difficulty
                      </label>
                      {errors.difficulty && touched.difficulty && (
                        <span className="form__error">{errors.difficulty}</span>
                      )}
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="form__group">
                      <input
                        type="text"
                        name="maxGroupSize"
                        id="maxGroupSize"
                        placeholder="maxGroupSize"
                        value={values.maxGroupSize}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form__input"
                      />
                      <label htmlFor="maxGroupSize" className="form__label">
                        max Group Size
                      </label>
                      {errors.maxGroupSize && touched.maxGroupSize && (
                        <span className="form__error">
                          {errors.maxGroupSize}
                        </span>
                      )}
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="form__group">
                      <input
                        type="text"
                        name="price"
                        id="price"
                        placeholder="price"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form__input"
                      />
                      <label htmlFor="price" className="form__label">
                        max Group Size
                      </label>
                      {errors.price && touched.price && (
                        <span className="form__error">{errors.price}</span>
                      )}
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="form__group">
                      <textarea
                        type="text"
                        name="description"
                        id="description"
                        rows="5"
                        placeholder="Tour description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="form__input"
                      />
                      <label htmlFor="email" className="form__label">
                        description
                      </label>
                      {errors.description && touched.description && (
                        <span className="form__error">
                          {errors.description}
                        </span>
                      )}
                    </div>
                  </Col>
                </Row>

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
                      onConfirm={doTourDelete}
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
      </DraggableModel>
    )
  );
}

export default TourModel;
