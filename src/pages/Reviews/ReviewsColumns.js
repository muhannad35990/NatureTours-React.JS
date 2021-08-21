import React from "react";
import { Space, Popconfirm, Rate } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import * as endpoints from "../../configs/endpointConfig";
import getColumnSearchProps from "../../util/getColumnSearchProps";

function ReviewsColumns(
  index,
  setIndex,
  doTheDelete,

  setcurrentRecord
) {
  const backendImg = `${endpoints.BACKEND_URL}/img/users/`;
  return [
    {
      key: "photo",
      width: "5rem",
      dataIndex: ["user", "photo"], // this is the value that is parsed from the DB / server side
      render: (image) => (
        <Avatar src={`${backendImg}${image}`} icon={<FileImageOutlined />} />
      ),
    },

    {
      title: "Name",
      dataIndex: ["user", "name"],
      key: "name",
      width: "15%",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("name", setIndex, index),
    },
    {
      title: "Tour",
      dataIndex: ["tour", "name"],
      key: "review",
      width: "15%",
      sorter: (a, b) => a.review.localeCompare(b.review),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("tour", setIndex, index),
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
      width: "30%",
      sorter: (a, b) => a.review.localeCompare(b.review),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(
        "review",

        setIndex,
        index
      ),
    },

    {
      title: "rating",
      dataIndex: "rating",
      key: "rating",
      width: "20%",
      sorter: (a, b) => a.rating - b.rating,
      sortDirections: ["descend", "ascend"],
      render: (rating) => (
        <Rate
          key="rateStar"
          style={{ fontSize: "1.2rem" }}
          allowHalf
          disabled
          value={rating}
        />
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this review?"
            onConfirm={() => doTheDelete(record.id)}
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

export default ReviewsColumns;
