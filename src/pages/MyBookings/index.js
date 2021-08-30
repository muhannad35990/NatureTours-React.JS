import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

import RotatingCard from "../../components/RotatingCard/RotatingCard";

import { getMyBookings } from "../../store/actions/BookingActions";

function MyBookings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const myBookings = useSelector((state) => state.bookings.mybookings);

  useEffect(() => {
    dispatch(getMyBookings(user._id));
  }, []);
  return (
    <div
      data-aos="fade-up"
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "3rem",
      }}
    >
      <Row justify="center">
        <h1 className="details__mainTitle" style={{ fontSize: "4rem" }}>
          My booked tours
        </h1>
      </Row>
      <Row
        type="flex"
        justify="center"
        style={{
          minHeight: "80%",
          alignItems: "center",
          justifyContent: "center",
          justifyItems: "center",
          textAlign: "center",
        }}
      >
        {myBookings?.map((mybook, index) => (
          <Col
            key={index}
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            xs={{ span: 24 }}
            sm={{ span: 12 }}
            md={{ span: 8 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            <RotatingCard
              title={mybook.tour.name}
              image={mybook.tour.imageCover}
              subtitle={mybook.tour.difficulty}
              desc={mybook.tour.description}
              location={mybook.tour.startLocation.description}
              date={mybook.tour.createdAt}
              numStops={mybook.tour.locations.length}
              numPeople={mybook.tour.maxGroupSize}
              rating={mybook.tour.ratingAverage}
              ratingQantity={mybook.tour.ratingQantity}
              price={mybook.tour.price}
              id={mybook.tour._id}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default withRouter(MyBookings);
