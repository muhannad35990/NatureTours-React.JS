import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space, Rate, Popconfirm } from "antd";
import Icon, {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
  NodeIndexOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { GetUserReviews } from "../../store/actions/ReviewActions";
import Loading from "../../components/Loading";
import ReviewModel from "../../components/Models/ReviewModel/ReviewModel";
import * as endpoints from "../../configs/endpointConfig";
import Avatar from "antd/lib/avatar/avatar";

function MyReviews() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userReviews = useSelector((state) => state.reviews.userReviews);
  const [showReview, setShowReview] = useState(false);
  const [showConfirmModel, setShowConfirmModel] = useState(false);
  const [currentRecord, setcurrentRecord] = useState(null);
  const backendImg = `${endpoints.BACKEND_URL}/img/tours/`;

  useEffect(() => {
    dispatch(GetUserReviews(auth.user._id));
  }, [auth]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  const doTheDelete = () => {
    //delete review from the database
  };

  const columns = [
    {
      title: "image",
      dataIndex: ["tour", "imageCover"], // this is the value that is parsed from the DB / server side
      render: (image) => (
        <Avatar src={`${backendImg}${image}`} icon={<FileImageOutlined />} />
      ),
    },
    {
      title: "Name",
      dataIndex: ["tour", "name"],
      key: "name",
      width: "30%",
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Duration",
      dataIndex: ["tour", "duration"],
      key: "duration",
      width: "12rem",
      sorter: (a, b) => a.duration.length - b.duration.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Difficulty",
      dataIndex: ["tour", "difficulty"],
      key: "difficulty",
      width: "12rem",
      sorter: (a, b) => a.difficulty.length - b.difficulty.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Price",
      dataIndex: ["tour", "price"],
      key: "price",
      width: "10rem",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
      sorter: (a, b) => a.review.length - b.review.length,
      sortDirections: ["descend", "ascend"],
      width: "20%",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: "30rem",
      render: (rating) => <Rate allowHalf disabled defaultValue={rating} />,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <button
            className="table_btn table_btn-edit"
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
            onCancel={() => setShowConfirmModel(false)}
            okText="Yes"
            cancelText="No"
          >
            <button
              className="table_btn  table_btn-edit"
              onClick={() => {
                setcurrentRecord(record);
                setShowConfirmModel(true);
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
      <Table columns={columns} dataSource={userReviews} />
      <ReviewModel
        show={showReview}
        onCancel={() => setShowReview(false)}
        record={currentRecord}
      />
    </div>
  );
}

export default MyReviews;
