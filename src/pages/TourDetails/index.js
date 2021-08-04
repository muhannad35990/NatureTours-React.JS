import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTour } from "../../store/actions/TourActions";
import * as endpoints from "../../configs/endpointConfig";
import Loading from "../../components/Loading";

import { EnvironmentOutlined, FieldTimeOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

function TourDetails() {
  const dispatch = useDispatch();
  const tour = useSelector((state) => state.tours.tour);
  const backendImg = `${endpoints.BACKEND_URL}/img/tours/`;
  const routeParams = useParams();
  const imgurl = `${backendImg}${tour?.images[0]}`;

  useEffect(() => {
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
            hsla(160, 64%, 43%, 0.8)), url('${backendImg}${tour.imageCover}')`,
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
              <span>{tour.duration} DAYS</span>
            </div>
            <div style={{ marginLeft: "2rem" }}>
              <EnvironmentOutlined className="header__heading__icon" />
              <span>{tour.startLocation.description}</span>
            </div>
          </div>
        </div>
      </div>
      <section className="waitSection">
        <div className="Whatwaiting">
          <Avatar.Group
            maxCount={3}
            size={125}
            maxStyle={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
            }}
          >
            <Avatar
              src={backendImg.concat(tour.images[0])}
              style={{
                marginLeft: "35%",
              }}
            />
            <Avatar
              src={backendImg.concat(tour.images[1])}
              style={{
                marginLeft: "-50%",
              }}
            />
            <Avatar
              src={backendImg.concat(tour.images[2])}
              style={{
                marginLeft: "-50%",
              }}
            />
          </Avatar.Group>
          <div style={{ marginLeft: "-5rem", marginRight: "5rem" }}>
            <h1 className="title">what are you waiting for?</h1>
            <p>
              {tour.duration} days, 1 advanture, infinite memories, make it
              yours today!
            </p>
          </div>
          <a href="#" className="button button--green">
            LOGIN TO BOOK TOUR
          </a>
        </div>
      </section>
    </div>
  );
}

export default TourDetails;
