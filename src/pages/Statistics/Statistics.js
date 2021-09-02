import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTourStatistics } from "../../store/actions/TourActions";
import { Pie, Bar } from "react-chartjs-2";
import { Col, Divider, Row } from "antd";

function Statistics() {
  const gutter = [32, 24];
  const labels = ["DIFFICULT", "MEDIUM", "EASY"];
  const backgroundColor = [" #55c57a", "#ffb900", "#2998ff"];

  const hoverBackgroundColor = ["#28b485", "#ff7730", "#5643fa"];
  const dispatch = useDispatch();
  const statistics = useSelector((state) => state.tours.statistics);
  const [numTours, setNumTours] = useState([]);
  const [numRaters, setNumRaters] = useState([]);
  const [avgRaters, setAvgRaters] = useState([]);
  const [maxPrice, setMaxPrice] = useState([]);
  const [minPrice, setMinPrice] = useState([]);
  const [avgPrice, setAvgPrice] = useState([]);
  useEffect(() => {
    dispatch(getTourStatistics());
  }, []);
  useEffect(() => {
    statistics.map((stat) => {
      setNumTours((prev) => [...prev, stat.numTours]);
      setNumRaters((prev) => [...prev, stat.numRatings]);
      setAvgRaters((prev) => [...prev, stat.avgRating]);
      setMaxPrice((prev) => [...prev, stat.maxPrice]);
      setMinPrice((prev) => [...prev, stat.minPrice]);
      setAvgPrice((prev) => [...prev, stat.avgPrice]);
    });
  }, [statistics]);
  const numToursData = {
    labels: labels,
    datasets: [
      {
        label: "Number of Tours",
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor,
        borderWidth: 2,
        data: numTours,
      },
    ],
  };
  const numRatersData = {
    labels: labels,
    datasets: [
      {
        label: "Number of Raters",
        backgroundColor: backgroundColor[0],
        hoverBackgroundColor: hoverBackgroundColor[0],
        borderWidth: 2,
        data: numRaters,
      },
      {
        label: "Average Rate",
        backgroundColor: backgroundColor[1],
        hoverBackgroundColor: hoverBackgroundColor[1],
        borderWidth: 2,
        data: avgRaters,
      },
    ],
  };
  const priceData = {
    labels: labels,
    datasets: [
      {
        label: "Max price",
        backgroundColor: backgroundColor[0],
        hoverBackgroundColor: hoverBackgroundColor[0],
        borderWidth: 2,
        data: maxPrice,
      },
      {
        label: "Min price",
        backgroundColor: backgroundColor[1],
        hoverBackgroundColor: hoverBackgroundColor[1],
        borderWidth: 2,
        data: minPrice,
      },
      {
        label: "Average price",
        backgroundColor: backgroundColor[2],
        hoverBackgroundColor: hoverBackgroundColor[2],
        borderWidth: 2,
        data: avgPrice,
      },
    ],
  };
  return (
    <div className="statistics">
      <Row
        gutter={gutter}
        type="flex"
        style={{ alignItems: "center" }}
        justify="center"
      >
        <Col span={12} style={{ padding: "10rem" }}>
          <Divider>Number of Tours per difficulty</Divider>
          <Pie data={numToursData} />
        </Col>
        <Col span={12}>
          <Divider>Number of Raters per difficulty</Divider>
          <Bar data={numRatersData} />
        </Col>
        <Col span={24}>
          <Divider>Price per difficulty</Divider>
          <Bar data={priceData} />
        </Col>
      </Row>
    </div>
  );
}

export default Statistics;
