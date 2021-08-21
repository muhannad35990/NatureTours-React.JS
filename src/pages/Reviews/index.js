import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FloatingAddBtn from "../../components/FloatingAddBtn/FloatingAddBtn";
import { getAllReviews } from "../../store/actions/ReviewActions";
import ReviewsColumns from "./ReviewsColumns";

function Reviews() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.allReviews);
  const [currentRecord, setcurrentRecord] = useState(null);
  const [index, setIndex] = useState(200);
  console.log("in the review page re rendering");
  useEffect(() => {
    dispatch(getAllReviews());
  }, []);

  const doTheDelete = (review) => {
    console.log(review);
    // dispatch(deleteReview(tour));
  };

  const columns = ReviewsColumns(
    index,
    setIndex,
    doTheDelete,
    setcurrentRecord
  );

  return (
    <div>
      revioes
      {reviews && (
        <Table
          key={index}
          columns={columns}
          dataSource={reviews}
          rowKey="_id"
        />
      )}
    </div>
  );
}

export default Reviews;
