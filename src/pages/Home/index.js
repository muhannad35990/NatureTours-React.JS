import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import RotatingCard from "../../components/RotatingCard/RotatingCard";
import { getAllTours } from "../../store/actions/TourActions";

function Home() {
  const dispatch = useDispatch();
  const tours = useSelector((state) => state.tours.tours);

  useEffect(() => {
    dispatch(getAllTours());
  }, []);
  return (
    <div
      style={{
        margin: "10rem 1rem",
      }}
    >
      <Row justify="center">
        {tours.map((tour, index) => (
          <Col
            key={index}
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            xs={{ span: 16 }}
            sm={{ span: 16 }}
            md={{ span: 10 }}
            lg={{ span: 8 }}
            xl={{ span: 6 }}
          >
            <RotatingCard
              title={tour.name}
              image={tour.image}
              subtitle={tour.difficulty}
              desc={tour.description}
              location={tour.startLocation.description}
              date={tour.createdAt}
              numStops={tour.locations.length}
              numPeople={tour.maxGroupSize}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
