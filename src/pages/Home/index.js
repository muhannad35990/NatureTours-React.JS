import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../components/Footer/Footer";

import RotatingCard from "../../components/RotatingCard/RotatingCard";
import SearchBox from "../../components/SearchBox/SearchBox";
import { getAllTours } from "../../store/actions/TourActions";

function Home() {
  const dispatch = useDispatch();
  const tours = useSelector((state) => state.tours.tours);

  useEffect(() => {
    dispatch(getAllTours());
  }, []);
  return (
    <div
      data-aos="fade-up"
      style={{
        margin: "10rem 1rem",
      }}
    >
      <Row justify="center">
        <SearchBox />
      </Row>
      <Row justify="center">
        {tours.map((tour, index) => (
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
              title={tour.name}
              image={tour.imageCover}
              subtitle={tour.difficulty}
              desc={tour.description}
              location={tour.startLocation.description}
              date={tour.createdAt}
              numStops={tour.locations.length}
              numPeople={tour.maxGroupSize}
              rating={tour.ratingAverage}
              ratingQantity={tour.ratingQantity}
              price={tour.price}
              id={tour._id}
            />
          </Col>
        ))}
      </Row>
      <Footer />
    </div>
  );
}

export default Home;
