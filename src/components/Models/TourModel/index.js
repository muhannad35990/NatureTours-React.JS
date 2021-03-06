import {
  Button,
  Col,
  Divider,
  Image,
  Popconfirm,
  Progress,
  Rate,
  Row,
  Select,
  Space,
  Upload,
  Collapse,
  DatePicker,
  Switch,
} from "antd";
import moment from "moment";
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
  DragOutlined,
  EditOutlined,
  EyeOutlined,
  LoadingOutlined,
  PlusOutlined,
  SaveOutlined,
  StopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import * as endpoints from "../../../configs/endpointConfig";
import AxiosInstance from "../../../util/intercepter";

import {
  deleteTour,
  deleteTourLocation,
  getAllTours,
  getTour,
  insertNewTour,
  setTour,
  updateTour,
} from "../../../store/actions/TourActions";

import MapBox from "../../mapBox/MapBox";
import showNotification from "../../alert/Alert";
import Guide from "../../guide/Guide";
import { Option } from "antd/lib/mentions";
import { GetAllguides } from "../../../store/actions/userActions";
import Avatar from "antd/lib/avatar/avatar";

function TourModel({ show, onCancel, record }) {
  const alert = useSelector((state) => state.alert.alert);
  const progess = useSelector((state) => state.alert.progess);
  const spinner = useSelector((state) => state.alert.spinner);
  const [isDeleteSpinner, setIsDeleteSpinner] = useState(false);
  const [newCoverImage, setNewCoverImage] = useState(null);
  const auth = useSelector((state) => state.auth);
  const guides = useSelector((state) => state.users.guides);
  const backenduserImg = `${endpoints.BACKEND_URL}/img/users/`;
  const tour = useSelector((state) => state.tours.tour);
  const [fileList, setFileList] = useState([]);
  const [imagePreview, SetImagePreview] = useState({});
  const { t } = useTranslation("words");
  const dispatch = useDispatch();
  const tourImgBackend = `${endpoints.BACKEND_URL}/img/tours`;
  const gutter = [32, 24];
  const { Panel } = Collapse;
  const [locationItems, setLocationItems] = useState([]);
  const [currentSelectedLocation, setCurrentSelectedLocation] = useState(null);
  const [newGuides, setNewGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [startDates, setStartDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [secret, setSecret] = useState(false);
  const tourModelSchema = Yup.object().shape({
    name: Yup.string()
      .required(t("Firstname_is_required"))
      .min(10, "Too short, It should be at least 10 char"),
    duration: Yup.number()
      .integer()
      .positive()
      .required("duration is required!"),
    price: Yup.number().integer().positive().required("price is required!"),

    maxGroupSize: Yup.number()
      .integer()
      .positive()
      .required("max Group Size is required!"),
    difficulty: Yup.string()
      .required("difficulty is required!")
      .oneOf(
        ["easy", "medium", "difficult"],
        "difficulty should be easy or medium or difficult"
      ),
    description: Yup.string(),
    // guides: Yup.array(),
    startLocation: Yup.object().shape({
      address: Yup.string().required("Start location address is required!"),
      description: Yup.string().required(
        "Start location description is required!"
      ),
      coordinates: Yup.array(),
    }),
    locations: Yup.array(),
  });
  useEffect(() => {
    if (record) {
      dispatch(setTour(record));
      setNewGuides(record.guides);
      setStartDates(record.startDates);
      setSecret(record.secretTour);
    }else{
      setNewGuides([]);
      setStartDates([]);
    }
  }, [record]);
  let initialTourModelValues = {
    name: tour ? tour?.name : "",
    duration: tour ? tour?.duration : 0,
    price: tour ? tour?.price : 0,
    maxGroupSize: tour ? tour?.maxGroupSize : 0,
    difficulty: tour ? tour?.difficulty : "easy",
    description: tour ? tour?.description : "",

    startLocation: {
      address: tour ? tour?.startLocation?.address : "",
      description: tour ? tour?.startLocation?.description : "",
      coordinates: tour ? tour.startLocation?.coordinates : [-70.9, 42.35],
    },

    locations: tour?.locations,
  };

  useEffect(() => {
    setLocationItems(tour?.locations);
  }, [tour]);
  useEffect(() => {
    dispatch(removeAllAlerts());
    const modimages = [];
    if (tour) {
      const images = tour?.images;

      if (images?.length > 0) {
        images.forEach((img) => {
          modimages.push({
            tourId: tour?.id,
            url: `${tourImgBackend}/${img}`,
            name: img,
          });
        });
      }
    }
    setFileList(modimages);
  }, [tour]);

  const grid = 8;
  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "white",

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  const onDateChange = (date) => {
    setStartDates((prev) => [...prev, date]);
    setSelectedDate(null);
  };
  const handleDeleteDate = (date) => {
    const newdates = startDates.filter((g) => g !== date);
    setStartDates(newdates);
  };
  function onChange(value, values) {
    const newGuide = guides.filter((g) => g._id === value);
    setNewGuides((prev) => [...prev, newGuide[0]]);
    setSelectedGuide(null);
  }
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "white",
    padding: grid,
    width: "100%",
    border: "1px solid #ddd",
  });
  const genExtra = (item) => (
    <DeleteOutlined
      style={{ fontSize: "1.6rem" }}
      onClick={(event) => {
        event.stopPropagation();
        dispatch(deleteTourLocation({ tourId: tour?.id, data: item._id }));
      }}
    />
  );
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setLocationItems(result);
    return result;
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    reorder(locationItems, result.source.index, result.destination.index);
  };
  const doUpdateTour = async (values) => {
    const finalValues = {
      name: values.name,
      duration: parseInt(values.duration),
      price: parseInt(values.price),
      maxGroupSize: parseInt(values.maxGroupSize),
      difficulty: values.difficulty,
      description: values.description,
      guides: newGuides,
      startDates: startDates,
      secretTour: secret,
      startLocation: {
        type: "Point",
        address: values.startLocation.address,
        description: values.startLocation.description,
        coordinates: [
          parseFloat(values.startLocation.coordinates[0]),
          parseFloat(values.startLocation.coordinates[1]),
        ],
      },
    };

    dispatch(removeAllAlerts());
    dispatch(setSpiner(true));
    if (tour && tour.id)
      dispatch(updateTour({ tourId: tour?.id, data: finalValues }));
    else dispatch(insertNewTour(values));
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
      `${endpoints.TOURS}/${tour?.id}`,
      fmData,
      config
    ).then((response) => {
      onSuccess("Ok");
      dispatch(getTour(tour?.id));
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
      `${endpoints.TOURS}/${tour?.id}`,
      fmData,
      config
    ).then((response) => {
      dispatch(setTour(response.data.data.doc));
      dispatch(getAllTours());
      showNotification("success", t("Updated_succssfully"), "Success");
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
      previewTitle: t("Tour_image"),
    });
  };
  const handleCoverPreview = () => {
    SetImagePreview({
      previewImage: `${tourImgBackend}/${tour?.imageCover}`,
      previewVisible: true,
      previewTitle: t("Tour_Cover_image"),
    });
  };
  const handleCancelPreview = () => {
    dispatch(getAllTours());
    SetImagePreview({ previewVisible: false });
  };

  const doTourDelete = () => {};

  const handleDeleteTourImage = async (file) => {
    dispatch(removeAllAlerts());
    await AxiosInstance.delete(
      `${endpoints.TOURS}/${tour?.id}/${file.name}`
    ).then((response) => {
      dispatch(getTour(tour?.id));
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
    <Modal
      title={tour ? tour?.name : t("Add_new_tour")}
      visible={show}
      onCancel={onCancel}
      width={1000}
      footer={null}
      destroyOnClose={true}
    >
      <div
        className="header"
        style={{
          marginTop: "-2.5rem",
          height: "30rem",
          backgroundImage: tour
            ? `linear-gradient(to right bottom,
            hsla(111, 55%, 64%, 0.8),
            hsla(160, 64%, 43%, 0.8)), url('${tourImgBackend}/${tour?.imageCover}')`
            : `linear-gradient(to right bottom,
            hsla(111, 55%, 64%, 0.8),
            hsla(160, 64%, 43%, 0.8))`,
          backgroundSize: "cover",
          backgroundBlendMode: "screen",
        }}
      >
        <div className="header__content">
          <h4 className="header__heading " style={{ fontSize: "4rem" }}>
            <span className="rotatecard__heading-span rotatecard__heading-span--1">
              {tour ? tour?.name : t("No_Name")}
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
          key="imageModel"
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
        key="formik"
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
            setFieldValue,
          } = props;
          return (
            <form id="form" key="form" onSubmit={handleSubmit}>
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
              <Divider>Trip information</Divider>
              <Row gutter={gutter}>
                <Col span={12}>
                  <div className="form__group">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder={t("Name")}
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form__input"
                    />
                    <label htmlFor="name" className="form__label">
                      {t("Name")}
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
                      key="duration"
                      placeholder={t("Duration")}
                      value={values.duration}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form__input"
                    />
                    <label htmlFor="duration" className="form__label">
                      {t("Duration")}
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
                      key="difficulty"
                      placeholder={t("Difficulty")}
                      value={values.difficulty}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form__input"
                    />
                    <label htmlFor="difficulty" className="form__label">
                      {t("Difficulty")}
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
                      key="maxGroupSize"
                      placeholder={t("Max_Group_Size")}
                      value={values.maxGroupSize}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form__input"
                    />
                    <label htmlFor="maxGroupSize" className="form__label">
                      {t("Max_Group_Size")}
                    </label>
                    {errors.maxGroupSize && touched.maxGroupSize && (
                      <span className="form__error">{errors.maxGroupSize}</span>
                    )}
                  </div>
                </Col>
                <Col span={12}>
                  <div className="form__group">
                    <input
                      type="text"
                      name="price"
                      id="price"
                      key="price"
                      placeholder={t("Price")}
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form__input"
                    />
                    <label htmlFor="price" className="form__label">
                      {t("Price")} ($)
                    </label>
                    {errors.price && touched.price && (
                      <span className="form__error">{errors.price}</span>
                    )}
                  </div>
                </Col>
                <Col span={12}>
                  <div className="form__group">
                    <Switch
                      name="secretTour"
                      value={secret}
                      onChange={() => setSecret(!secret)}
                      style={{
                        width: "8rem",
                        height: "3rem",
                        marginTop: "1rem",
                      }}
                    />

                    <label htmlFor="secretTour" className="form__label">
                      {t("secret_Tour")}
                    </label>
                    {errors.secretTour && touched.secretTour && (
                      <span className="form__error">{errors.secretTour}</span>
                    )}
                  </div>
                </Col>

                <Col span={24}>
                  <div className="form__group">
                    <textarea
                      type="text"
                      name="description"
                      id="description"
                      key="description"
                      rows="5"
                      placeholder={t("description")}
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form__input"
                    />
                    <label htmlFor="description" className="form__label">
                      {t("description")}
                    </label>
                    {errors.description && touched.description && (
                      <span className="form__error">{errors.description}</span>
                    )}
                  </div>
                </Col>
              </Row>

              <Row gutter={gutter}>
                <Col span={12}>
                  <Divider>{t("Start_Dates")}</Divider>
                  <div
                    className="form__group"
                    style={{
                      borderRight: "1px solid #ddd",
                      padding: "1rem 1rem",
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ margin: "1rem 0", width: "60%" }}>
                      <DatePicker
                        placeholder={t("Select_to_add_new_date")}
                        onChange={(date, dateString) =>
                          onDateChange(date.toISOString())
                        }
                        value={selectedDate}
                      />
                    </div>

                    {startDates.map((d) => (
                      <div
                        key={d}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "50%",
                        }}
                      >
                        <DatePicker
                          key={d}
                          value={moment.utc(d)}
                          style={{ margin: "1rem 0" }}
                          disabled={true}
                        />
                        <DeleteOutlined
                          style={{
                            fontSize: "1.6rem",
                            color: "red",
                            marginLeft: ".5rem",
                          }}
                          onClick={() => handleDeleteDate(d)}
                        />
                      </div>
                    ))}
                  </div>
                </Col>

                <Col span={12}>
                  <Divider>{t("Guides")}</Divider>
                  <Select
                    allowClear
                    placeholder={t("Add_new_guide")}
                    style={{ width: "100%" }}
                    onChange={(value) => onChange(value, values)}
                    filterOption={(inputValue, option) =>
                      option.children.props.children[2].props.children
                        .toString()
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    }
                    showSearch
                    value={selectedGuide}
                  >
                    {guides &&
                      guides.map((option) => (
                        <Option key={option._id} value={option._id}>
                          <div className="details__guide" key={option._id}>
                            <Avatar
                              src={`${backenduserImg}${option.photo}`}
                              icon={<UserOutlined />}
                              size={18}
                            />
                            <h5 className="details__item details__guide__role">
                              {option.role}
                            </h5>
                            <h5 className="details__subItem"> {option.name}</h5>
                          </div>
                        </Option>
                      ))}
                  </Select>
                  {newGuides.length > 0 &&
                    newGuides.map((guide) => (
                      <Guide
                        key={guide._id}
                        id={guide._id}
                        name={guide.name}
                        role={guide.role}
                        image={guide.photo}
                        setNewGuides={setNewGuides}
                        newGuides={newGuides}
                      />
                    ))}
                </Col>
              </Row>

              <Divider>{t("Start_Location")}</Divider>
              {values.startLocation !== null &&
                values.startLocation.coordinates !== [] && (
                  <Row gutter={gutter}>
                    <Col span={12}>
                      <div className="form__group">
                        <input
                          type="text"
                          name="startLocation.address"
                          id="startLocation.address"
                          key="startLocation.address"
                          placeholder={t("address")}
                          value={values.startLocation.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form__input"
                        />
                        <label
                          htmlFor="startLocation.address"
                          className="form__label"
                        >
                          {t("address")}
                        </label>
                        {errors.startLocation?.address &&
                          touched.startLocation?.address && (
                            <span className="form__error">
                              {errors.startLocation?.address}
                            </span>
                          )}
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="form__group">
                        <input
                          type="text"
                          name="startLocation.description"
                          id="startLocation.description"
                          key="startLocation.description"
                          placeholder={t("description")}
                          value={values.startLocation.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form__input"
                        />
                        <label
                          htmlFor="startLocation.description"
                          className="form__label"
                        >
                          {t("description")}
                        </label>
                        {errors.startLocation?.description &&
                          touched.startLocation?.description && (
                            <span className="form__error">
                              {errors.startLocation?.description}
                            </span>
                          )}
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="form__group">
                        <input
                          type="text"
                          name="startLocation__coordinates0"
                          id="startLocation__coordinates0"
                          key="startLocation__coordinates0"
                          placeholder="lng"
                          value={values.startLocation?.coordinates[0]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form__input"
                        />
                        <label
                          htmlFor="startLocation__coordinates0"
                          className="form__label"
                        >
                          lng
                        </label>
                        {errors.startLocation &&
                          errors.startLocation.coordinates &&
                          errors.startLocation.coordinates[0] &&
                          touched.startLocation.coordinates[0] && (
                            <span className="form__error">
                              {errors.startLocation.coordinates[0]}
                            </span>
                          )}
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="form__group">
                        <input
                          type="text"
                          name="startLocation__coordinates1"
                          id="startLocation__coordinates1"
                          key="startLocation__coordinates1"
                          placeholder="lat"
                          value={values.startLocation?.coordinates[1]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="form__input"
                        />
                        <label
                          htmlFor="startLocation__coordinates1"
                          className="form__label"
                        >
                          lat
                        </label>
                        {errors.startLocation &&
                          errors.startLocation.coordinates &&
                          errors.startLocation.coordinates[1] &&
                          touched.startLocation.coordinates[1] && (
                            <span className="form__error">
                              {errors.startLocation.coordinates[1]}
                            </span>
                          )}
                      </div>
                    </Col>
                  </Row>
                )}
              <Row>
                <Col span={24}>
                  <div className="model__container">
                    <MapBox
                      key="startMap11111"
                      isRightClickEnabled={true}
                      locations={[tour?.startLocation]}
                      popLocation={null}
                      menu={2}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                </Col>
              </Row>
              <Divider>{t("Loactions")}</Divider>
              <Row gutter={gutter}>
                <Col span={24}>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                        >
                          {locationItems?.map((item, index) => (
                            <Draggable
                              key={item._id}
                              draggableId={item._id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                  )}
                                >
                                  <Collapse
                                    defaultActiveKey={["1"]}
                                    expandIcon={({ isActive }) => (
                                      <DragOutlined
                                        rotate={isActive ? 45 : 0}
                                        style={{ fontSize: "1.7rem" }}
                                      />
                                    )}
                                    onChange={() =>
                                      setCurrentSelectedLocation(item)
                                    }
                                  >
                                    <Panel
                                      header={item.description}
                                      key={item._id}
                                      extra={genExtra(item)}
                                    >
                                      <Row gutter={gutter}>
                                        <Col span={12}>
                                          <div className="form__group">
                                            <input
                                              type="text"
                                              name={`locaction description${item._id}`}
                                              id={`locactions_description${item._id}`}
                                              placeholder={t("description")}
                                              value={item.description}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              className="form__input"
                                            />
                                            <label
                                              htmlFor={`locactions_description${item._id}`}
                                              className="form__label"
                                            >
                                              {t("description")}
                                            </label>
                                          </div>
                                        </Col>
                                        <Col span={12}>
                                          <div className="form__group">
                                            <input
                                              type="text"
                                              name={`locaction day${item._id}`}
                                              id={`locactions_day${item._id}`}
                                              placeholder={t("day")}
                                              value={item.day}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              className="form__input"
                                            />
                                            <label
                                              htmlFor={`locactions_description${item._id}`}
                                              className="form__label"
                                            >
                                              {t("day")}
                                            </label>
                                          </div>
                                        </Col>
                                        <Col span={12}>
                                          <div className="form__group">
                                            <input
                                              type="text"
                                              name={`locactionX${item._id}`}
                                              id={`locactionsX${item._id}`}
                                              placeholder="lng"
                                              value={
                                                values.locations[index]
                                                  ?.coordinates[0]
                                              }
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              className="form__input"
                                            />
                                            <label
                                              htmlFor={`locactionsX${item._id}`}
                                              className="form__label"
                                            >
                                              lng
                                            </label>
                                          </div>
                                        </Col>
                                        <Col span={12}>
                                          <div className="form__group">
                                            <input
                                              type="text"
                                              name={`locactionY${item._id}`}
                                              id={`locactionsY${item._id}`}
                                              placeholder="lat"
                                              value={
                                                values.locations[index]
                                                  ?.coordinates[1]
                                              }
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              className="form__input"
                                            />
                                            <label
                                              htmlFor={`locactionsY${item._id}`}
                                              className="form__label"
                                            >
                                              lat
                                            </label>
                                          </div>
                                        </Col>
                                      </Row>
                                    </Panel>
                                  </Collapse>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <div className="model__container">
                    <MapBox
                      key="locationsMap11"
                      isRightClickEnabled={true}
                      locations={locationItems}
                      popLocation={currentSelectedLocation}
                      menu={1}
                    />
                  </div>
                </Col>
              </Row>
              <Row justify="end" gutter={gutter}>
                <Col span={6}>
                  <button
                    type="button"
                    className="btn btn--cancel"
                    style={{ marginTop: "3rem" }}
                    onClick={() => onCancel()}
                  >
                    <StopOutlined
                      style={{
                        fontSize: "1.6rem",
                        marginRight: "1rem",
                      }}
                    />

                    <span>{t("Cancel")}</span>
                  </button>
                </Col>

                <Col span={6}>
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
                        <span>{t("SAVE")}</span>
                      </div>
                    )}
                  </button>
                </Col>
              </Row>
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
}

export default TourModel;
