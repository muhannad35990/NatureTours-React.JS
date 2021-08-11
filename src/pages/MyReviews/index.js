import React, { useEffect, useRef, useState } from "react";
import { Table, Input, Button, Space, Rate, Popconfirm } from "antd";
import Icon, {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
  NodeIndexOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteUserReview,
  GetUserReviews,
} from "../../store/actions/ReviewActions";
import Loading from "../../components/Loading";
import ReviewModel from "../../components/Models/ReviewModel/ReviewModel";
import * as endpoints from "../../configs/endpointConfig";
import Avatar from "antd/lib/avatar/avatar";
import getColumnSearchProps from "../../util/getColumnSearchProps";
function MyReviews() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userReviews = useSelector((state) => state.reviews.userReviews);
  const [showReview, setShowReview] = useState(false);
  const [currentRecord, setcurrentRecord] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const refSearchInput = useRef();

  const backendImg = `${endpoints.BACKEND_URL}/img/tours/`;
  useEffect(() => {
    dispatch(GetUserReviews(auth.user._id));
  }, [auth]);

  const doTheDelete = () => {
    //delete review from the database
    dispatch(DeleteUserReview(currentRecord.id));
    dispatch(GetUserReviews(auth.user._id));
  };

  const columns = [
    {
      key: ["tour", "imageCover"],
      title: "image",
      dataIndex: ["tour", "imageCover"], // this is the value that is parsed from the DB / server side
      render: (image) => (
        <Avatar src={`${backendImg}${image}`} icon={<FileImageOutlined />} />
      ),
    },
    {
      title: "Name",
      dataIndex: ["tour", "name"],
      key: ["tour", "name"],
      width: "30rem",
      sorter: (a, b) => a.tour.name.localeCompare(b.tour.name),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(
        ["tour", "name"],
        refSearchInput,
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn
      ),
    },
    {
      title: "Duration",
      dataIndex: ["tour", "duration"],
      key: ["tour", "duration"],
      width: "12rem",
      sorter: (a, b) => a.tour.duration - b.tour.duration,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(
        ["tour", "duration"],
        refSearchInput,
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn
      ),
    },
    {
      title: "Difficulty",
      dataIndex: ["tour", "difficulty"],
      key: ["tour", "difficulty"],
      width: "12rem",
      sorter: (a, b) => a.tour.difficulty.localeCompare(b.tour.difficulty),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(
        ["tour", "difficulty"],
        refSearchInput,
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn
      ),
    },
    {
      title: "Price",
      dataIndex: ["tour", "price"],
      key: ["tour", "price"],
      width: "10rem",
      sorter: (a, b) => a.tour.price - b.tour.price,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
      sorter: (a, b) => a.review.localeCompare(b.review),
      sortDirections: ["descend", "ascend"],
      width: "20%",
      ...getColumnSearchProps(
        ["review"],
        refSearchInput,
        searchText,
        setSearchText,
        searchedColumn,
        setSearchedColumn
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: "30rem",
      render: (rating) => (
        <Rate key="rateStar" allowHalf disabled value={rating} />
      ),
      sorter: (a, b) => a.rating - b.rating,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <button
            className="table_btn table_btn-edit"
            key="btnedit"
            onClick={() => {
              setcurrentRecord(record);
              setShowReview(true);
            }}
          >
            <EditOutlined />
          </button>
          <Popconfirm
            title="Are you sure to delete this review?"
            onConfirm={doTheDelete}
            okText="Yes"
            cancelText="No"
            key="popUp"
          >
            <button
              className="table_btn  table_btn-edit"
              key="btndelete"
              onClick={() => {
                setcurrentRecord(record);
              }}
            >
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {userReviews && (
        <Table key="reviewTable" columns={columns} dataSource={userReviews} />
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
