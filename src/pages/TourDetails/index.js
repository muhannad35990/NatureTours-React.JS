import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTour } from "../../store/actions/TourActions";
import * as endpoints from "../../configs/endpointConfig";
import Loading from "../../components/Loading";

import { EnvironmentOutlined, FieldTimeOutlined } from "@ant-design/icons";
import { Col, Divider, Row } from "antd";

function TourDetails() {
  const dispatch = useDispatch();
  const tour = useSelector((state) => state.tours.tour);
  const tourCover =
    tour && `${endpoints.BACKEND_URL}/img/tours/${tour.imageCover}`;
  const routeParams = useParams();

  useEffect(() => {
    console.log(routeParams.id);
    dispatch(getTour(routeParams.id));
  }, [routeParams]);
  return !tour ? (
    <Loading />
  ) : (
    <div>
      <div
        className="header"
        style={{
          backgroundImage: `linear-gradient(to right bottom,
            hsla(111, 55%, 64%, 0.8),
            hsla(160, 64%, 43%, 0.8)), url('${tourCover}')`,
        }}
      >
        <div className="header__content">
          <h4 className="header__heading ">
            <span className="rotatecard__heading-span rotatecard__heading-span--1">
              {tour.name}
            </span>
          </h4>
          <div style={{ display: "flex" }}>
            <div>
              <FieldTimeOutlined className="header__heading__icon" />
              <span>{tour.duration}</span>
            </div>
            <div style={{ marginLeft: "2rem" }}>
              <EnvironmentOutlined className="header__heading__icon" />
              <span>{tour.startLocation.description}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetails;
