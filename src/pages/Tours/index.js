import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteUserReview,
  GetUserReviews,
} from "../../store/actions/ReviewActions";
import UserModel from "../../components/Models/UserModel/UserModel";
import ToursColumns from "./ToursColumns";
import { getAllTours } from "../../store/actions/TourActions";

function Tours() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const tours = useSelector((state) => state.tours.tours);
  const [showTour, setshowTour] = useState(false);
  const [currentRecord, setcurrentRecord] = useState(null);

  const [index, setIndex] = useState(100);

  useEffect(() => {
    dispatch(getAllTours());
    console.log(tours);
  }, []);

  const doTheDelete = () => {
    //delete review from the database
    dispatch(DeleteUserReview(currentRecord.id));
    dispatch(GetUserReviews(auth.user._id));
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
      <UserModel
        show={showTour}
        onCancel={() => setshowTour(false)}
        record={currentRecord}
      />
    </div>
  );
}

export default Tours;
