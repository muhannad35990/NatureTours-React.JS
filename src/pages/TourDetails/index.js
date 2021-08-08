import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTour, getTourReviews } from "../../store/actions/TourActions";
import * as endpoints from "../../configs/endpointConfig";
import Loading from "../../components/Loading";
import moment from "moment";

import {
  CalendarOutlined,
  EnvironmentOutlined,
  FieldTimeOutlined,
  LineChartOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import MapBox from "../../components/mapBox/MapBox";
import Review from "../../components/Review/Review";
import logogreen from "../../img/logo-green.png";

function TourDetails() {
  const dispatch = useDispatch();
  const tour = useSelector((state) => state.tours.tour);
  const tourReviews = useSelector((state) => state.tours.reviews);

  const backendImg = `${endpoints.BACKEND_URL}/img/tours/`;
  const backenduserImg = `${endpoints.BACKEND_URL}/img/users/`;
  const routeParams = useParams();

  useEffect(() => {
    dispatch(getTour(routeParams.id));
    dispatch(getTourReviews(routeParams.id));
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

      <section>
        <div className="details">
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                padding: "15rem 10%",
                backgroundColor: "#ddd",
              }}
            >
              <div>
                <h1 className="details__mainTitle">QUICK FACTS</h1>
                <div className="details__factItem">
                  <CalendarOutlined className="details__icon" />
                  <h5 className="details__item"> NEXT DATE </h5>
                  <h5 className="details__subItem">
                    {moment(tour.createdAt).format("MMMM, YYYY")}
                  </h5>
                </div>
                <div className="details__factItem">
                  <LineChartOutlined className="details__icon" />
                  <h5 className="details__item"> DIFFICULTY </h5>
                  <h5 className="details__subItem"> {tour.difficulty} </h5>
                </div>
                <div className="details__factItem">
                  <UserOutlined className="details__icon" />
                  <h5 className="details__item">PARTICIPANTS </h5>
                  <h5 className="details__subItem">{tour.maxGroupSize}</h5>
                </div>
                <div className="details__factItem">
                  <StarOutlined className="details__icon" />
                  <h5 className="details__item"> RATING </h5>
                  <h5 className="details__subItem"> {tour.ratingAverage}/5 </h5>
                </div>
              </div>

              <div style={{ marginTop: "3rem" }}>
                <h1 className="details__mainTitle">YOUR TOUR GUIDES</h1>
                <div>
                  {tour.guides.map((t, index) => (
                    <div className="details__guide" key={index}>
                      <Avatar
                        src={`${backenduserImg}${t.photo}`}
                        icon={<UserOutlined />}
                      />
                      <h5 className="details__item details__guide__role">
                        {t.role}
                      </h5>
                      <h5 className="details__subItem"> {t.name}</h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="details__about">
              <div>
                <h1 className="details__mainTitle">ABOUT {tour.name} TOUR</h1>
                <p className="details__about__text">{tour.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="gallery">
        {tour.images.map((img, index) => (
          <img
            className="gallery__image"
            key={index}
            src={backendImg.concat(img)}
            alt=""
          />
        ))}
      </section>
      <section className="mapContainer">
        <MapBox />
      </section>

      <section className="reviewContainer">
        <div className="reviewContainer__box">
          {tourReviews.map((review, index) => (
            <Review key={index} review={review} />
          ))}
        </div>
      </section>

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

          <a href="/login" className="button button--green">
            LOGIN TO BOOK TOUR
          </a>
        </div>
      </section>
      <section className="footer">
        <figure className="footer__logoContainer">
          <img src={logogreen} alt="logogreen" className="footer__logo" />
        </figure>
        <div className="footer__content">
          <div className="footer__content--right">
            <div className="footer__content__navigation">
              <ul className="list">
                <li className="list__item">about us</li>
                <li className="list__item">contanct</li>
                <li className="list__item">careers</li>
                <li className="list__item">bacome a guide</li>
                <li className="list__item">Download apps</li>
              </ul>
            </div>
          </div>
          <div className="footer__content--left">
            <div className="footer__content__paragraph">
              <p>
                Copyright © by MUHANNAD HAMMADA. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Voluptatibus laudantium magni
                provident nam saepe ipsam, eaque ut deleniti sint, maiores
                veritatis non iure reprehenderit. Aut ad itaque alias vel
                aliquam.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TourDetails;
