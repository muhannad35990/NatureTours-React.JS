import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteUserReview,
  GetUserReviews,
} from "../../store/actions/ReviewActions";

import ToursColumns from "./ToursColumns";
import {
  getAllTours,
  DeleteTour,
  GetTour,
} from "../../store/actions/TourActions";

import TourModel from "../../components/Models/TourModel";
import FloatingAddBtn from "../../components/FloatingAddBtn/FloatingAddBtn";

function Tours() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const tours = useSelector((state) => state.tours.tours);
  const [showTour, setshowTour] = useState(false);
  const [currentRecord, setcurrentRecord] = useState(null);

  const [index, setIndex] = useState(100);

  useEffect(() => {
    dispatch(getAllTours());
  }, []);

  const doTheDelete = (tour) => {
    console.log(tour);
  };

  const columns = ToursColumns(
    index,
    setIndex,
    doTheDelete,
    setshowTour,
    setcurrentRecord
  );
  return (
    <div>
      {tours && (
        <Table key={index} columns={columns} dataSource={tours} rowKey="_id" />
      )}
      <FloatingAddBtn handleClick={setshowTour} />
      <TourModel
        show={showTour}
        onCancel={() => setshowTour(false)}
        record={currentRecord}
      />
    </div>
  );
}

export default Tours;
