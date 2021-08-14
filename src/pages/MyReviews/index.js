import React, { useEffect, useRef, useState } from "react";
import { Table, Space, Rate, Popconfirm } from "antd";

import { useDispatch, useSelector } from "react-redux";
import {
  DeleteUserReview,
  GetUserReviews,
} from "../../store/actions/ReviewActions";

import ReviewModel from "../../components/Models/ReviewModel/ReviewModel";
import ReviewColumns from "./ReviewColumns";

function MyReviews() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userReviews = useSelector((state) => state.reviews.userReviews);
  const [showReview, setShowReview] = useState(false);
  const [currentRecord, setcurrentRecord] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(GetUserReviews(auth.user._id));
  }, [auth]);

  const doTheDelete = () => {
    //delete review from the database
    dispatch(DeleteUserReview(currentRecord.id));
    dispatch(GetUserReviews(auth.user._id));
  };
  const columns = ReviewColumns(
    index,
    setIndex,
    doTheDelete,
    setShowReview,
    setcurrentRecord
  );
  return (
    <div>
      {userReviews && (
        <Table
          key={index}
          columns={columns}
          dataSource={userReviews}
          rowKey="name"
        />
      )}
      <ReviewModel
        show={showReview}
        onCancel={() => setShowReview(false)}
        record={currentRecord}
      />
    </div>
  );
}

export default MyReviews;
