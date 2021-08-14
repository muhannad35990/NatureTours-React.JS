import React from "react";
import getColumnSearchProps from "../../util/getColumnSearchProps";
import * as endpoints from "../../configs/endpointConfig";
import Avatar from "antd/lib/avatar/avatar";
import {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { Space, Rate, Popconfirm } from "antd";

function ReviewColumns(
  index,
  setIndex,
  doTheDelete,
  setShowReview,
  setcurrentRecord
) {
  const backendImg = `${endpoints.BACKEND_URL}/img/tours/`;

  return [
    {
      key: ["tour", "imageCover"],
      width: "5rem",
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
      ...getColumnSearchProps(["tour", "name"], setIndex, index),
    },
    {
      title: "Duration",
      dataIndex: ["tour", "duration"],
      key: ["tour", "duration"],
      width: "12rem",
      sorter: (a, b) => a.tour.duration - b.tour.duration,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(["tour", "duration"], setIndex, index),
    },
    {
      title: "Difficulty",
      dataIndex: ["tour", "difficulty"],
      key: ["tour", "difficulty"],
      width: "12rem",
      sorter: (a, b) => a.tour.difficulty.localeCompare(b.tour.difficulty),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(["tour", "difficulty"], setIndex, index),
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
      ...getColumnSearchProps(["review"], setIndex, index),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: "30rem",
      render: (rating) => (
        <Rate
          key="rateStar"
          style={{ fontSize: "1.2rem" }}
          allowHalf
          disabled
          value={rating}
        />
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
}

export default ReviewColumns;
