import {
  Button,
  Col,
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
  getTour,
  setTour,
  updateTour,
} from "../../../store/actions/TourActions";

function TourModel({ show, onCancel, record }) {
  const tour = useSelector((state) => state.tours.tour);
  const alert = useSelector((state) => state.alert.alert);
  const progess = useSelector((state) => state.alert.progess);
  const spinner = useSelector((state) => state.alert.spinner);
  const [isDeleteSpinner, setIsDeleteSpinner] = useState(false);
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
        setFileList(modimages);
      } else setFileList([]);
    }
  }, [tour]);

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

    fileList;
    console.log(fmData, tour.id);
    await AxiosInstance.patch(
      `${endpoints.TOURS}/${tour.id}`,
      fmData,
      config
    ).then((response) => {
      console.log(response);
      onSuccess("Ok");
      dispatch(getTour(tour.id));
      // dispatch(setUserData(response?.data?.user));
      showNotification("success", "Image updated successfully", "Success");
    });
  };
  const handlePreview = (image) => {
    SetImagePreview({
      previewImage: image.url,
      previewVisible: true,
      previewTitle: "Tour image",
    });
  };

  const handleCancelPreview = () => SetImagePreview({ previewVisible: false });

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

  const doUpdateUser = async (values) => {
    values = {
      name: values.name,
      email: values.email,
      userId: tour._id,
    };

    dispatch(removeAllAlerts());
    dispatch(setSpiner(true));
    // dispatch(updateUser(values));
  };
  const handleDeleteTourImage = ({ file, fileList, event }) => {
    dispatch(removeAllAlerts());
    const newImages = [];
    fileList.forEach((item) => newImages.push(item.name));
    dispatch(updateTour({ data: { images: newImages }, tourId: file.tourId }));
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
      <Modal
        visible={show}
        title={tour.name}
        footer={null}
        onCancel={onCancel}
        destroyOnClose={true}
        width={1000}
      >
        <Row justify="center">
          <Space>
            <div style={{ display: "flex" }}>
              <Upload
                listType="picture-card"
                accept="image/*"
                fileList={fileList}
                onPreview={handlePreview}
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
              alt="example"
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
      </Modal>
    )
  );
}

export default TourModel;
