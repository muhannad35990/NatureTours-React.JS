import { Col, Row } from "antd";
import React from "react";
import DraggableModel from "../DraggableModel";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined, SaveOutlined } from "@ant-design/icons";
import ObjectId from "mongo-objectid";
import {
  removeAllAlerts,
  setSpiner,
} from "../../../store/actions/AlertActions";
import { updateTour } from "../../../store/actions/TourActions";

function AddNewCoordinateModel({ visible, onCancel, lng, lat }) {
  const dispatch = useDispatch();
  const tour = useSelector((state) => state.tours.tour);

  const gutter = [32, 24];
  const locationModelSchema = Yup.object().shape({
    description: Yup.string().required("decription is required"),
    day: Yup.number("should be number").positive("should be positive"),
    location_X: Yup.number().required("coordinate is required"),
    location_Y: Yup.number().required("coordinate is required"),
  });
  const initialLocationModelValues = {
    description: "",
    day: "",
    location_X: lng,
    location_Y: lat,
  };
  const doUpdateTourLocations = async (values) => {
    dispatch(removeAllAlerts());
    const id = new ObjectId();
    const newLocation = {
      type: "Point",
      coordinates: [
        Number.parseFloat(values.location_X),
        Number.parseFloat(values.location_Y),
      ],
      _id: id.hex,
      description: values.description,
      day: Number.parseInt(values.day),
    };

    const data = { locations: newLocation };
    dispatch(updateTour({ tourId: tour.id, data: data }));
  };

  return (
    <DraggableModel
      name="Add new location"
      visible={visible}
      footer={null}
      onCancel={onCancel}
      destroyOnClose={true}
      width={500}
    >
      <Formik
        initialValues={initialLocationModelValues}
        validationSchema={locationModelSchema}
        onSubmit={doUpdateTourLocations}
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
              <Row gutter={gutter}>
                <Col span={12}>
                  <div className="form__group">
                    <input
                      type="text"
                      name="description"
                      id="description"
                      placeholder="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form__input"
                    />
                    <label htmlFor="description" className="form__label">
                      description
                    </label>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="form__group">
                    <input
                      type="text"
                      name="day"
                      id="day"
                      placeholder="day"
                      value={values.day}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form__input"
                    />
                    <label htmlFor="day" className="form__label">
                      day
                    </label>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="form__group">
                    <input
                      type="text"
                      name="lng"
                      id="lng"
                      placeholder="lng"
                      value={values.location_X}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form__input"
                    />
                    <label htmlFor="lng" className="form__label">
                      lng
                    </label>
                  </div>
                </Col>
                <Col span={12}>
                  <div className="form__group">
                    <input
                      type="text"
                      name="lat"
                      id="lat"
                      placeholder="lat"
                      value={values.location_Y}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form__input"
                    />
                    <label htmlFor="lat" className="form__label">
                      lat
                    </label>
                  </div>
                </Col>
                <Col span={24}>
                  <button
                    type="submit"
                    className="btn btn--green"
                    style={{ marginTop: "3rem" }}
                  >
                    <div>
                      <SaveOutlined
                        style={{
                          fontSize: "1.6rem",
                          marginRight: "1rem",
                        }}
                      />
                      <span>SAVE</span>
                    </div>
                  </button>
                </Col>
              </Row>
            </form>
          );
        }}
      </Formik>
    </DraggableModel>
  );
}

export default AddNewCoordinateModel;
