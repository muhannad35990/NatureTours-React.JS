import {
  CalendarOutlined,
  EnvironmentOutlined,
  FlagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import React from "react";
import moment from "moment";
import * as endpoints from "../../configs/endpointConfig";

function RotatingCard({
  title,
  image,
  subtitle,
  desc,
  location,
  date,
  numStops,
  numPeople,
}) {
  return (
    <div data-aos="fade-up" className=" rotatecard">
      <div className=" rotatecard__side rotatecard__side--front">
        <div
          className="rotatecard__picture "
          style={{
            backgroundImage: `linear-gradient(to right bottom,
                #7ed56f,
                #28b485), url('${endpoints.BACKEND_URL}/img/tours/${image}')`,
          }}
        ></div>
        <h4 className="rotatecard__heading ">
          <span className="rotatecard__heading-span rotatecard__heading-span--1">
            {title}
          </span>
        </h4>
        <div className="rotatecard__details">
          <h5 className="rotatecard__details__title">{subtitle}</h5>
          <p className="rotatecard__details__desc">
            {desc.substring(0, 50)} <span>{desc.length > 50 ? "..." : ""}</span>
          </p>

          <Row justify="start" gutter={[16, 24]}>
            <Col span={12} className="rotatecard__details__gridcol">
              <EnvironmentOutlined className="rotatecard__details__icon" />
              <span>{location}</span>
            </Col>
            <Col span={12} className="rotatecard__details__gridcol">
              <CalendarOutlined className="rotatecard__details__icon" />
              <span>{moment(date).format("MMMM, YYYY")}</span>
            </Col>
            <Col span={12} className="rotatecard__details__gridcol">
              <FlagOutlined className="rotatecard__details__icon" />
              <span>{numStops} stops</span>
            </Col>
            <Col span={12} className="rotatecard__details__gridcol">
              <UserOutlined className="rotatecard__details__icon" />
              <span>{numPeople} people</span>
            </Col>
          </Row>
        </div>
      </div>
      <div className=" rotatecard__side rotatecard__side--back rotatecard__side--back--1">
        <div className="rotatecard__side--back__content">
          <div>
            <h1 className="rotatecard__rating">4.5</h1>
            <h5 className="rotatecard__numRating">rating (45)</h5>
          </div>
          <div>
            <h1 className="rotatecard__price">$275</h1>
            <h5 className="rotatecard__numRating">Per person</h5>
          </div>

          {/* <h1 className="rotatecard__price">$275</h1>
          <h1 className="rotatecard__only">Per person</h1> */}
        </div>

        <a href="#dialog" className="button button--white">
          details
        </a>
      </div>
    </div>
  );
}

export default RotatingCard;
