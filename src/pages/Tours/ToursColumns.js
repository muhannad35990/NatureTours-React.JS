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

function ToursColumns(
  index,
  setIndex,
  doTheDelete,
  setshowTour,
  setcurrentRecord
) {
  const backendImg = `${endpoints.BACKEND_URL}/img/tours/`;
  return [
    {
      key: "photo",
      width: "5rem",
      dataIndex: "imageCover", // this is the value that is parsed from the DB / server side
      render: (image) => (
        <Avatar src={`${backendImg}${image}`} icon={<FileImageOutlined />} />
      ),
    },

    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("name", setIndex, index),
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      width: "10%",
      sorter: (a, b) => a.difficulty.localeCompare(b.difficulty),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(
        "difficulty",

        setIndex,
        index
      ),
    },
    {
      title: "duration",
      dataIndex: "duration",
      key: "duration",
      width: "10%",
      sorter: (a, b) => a.duration - b.duration,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("duration", setIndex, index),
    },
    {
      title: "Max Group Size",
      dataIndex: "maxGroupSize",
      key: "maxGroupSize",
      width: "15%",
      sorter: (a, b) => a.maxGroupSize - b.maxGroupSize,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("maxGroupSize", setIndex, index),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "5%",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("price", setIndex, index),
    },

    {
      title: "secret Tour",
      dataIndex: "secretTour",
      key: "secretTour",
      width: "10%",
      sorter: (a, b) => a.ratingAverage - b.ratingAverage,
      sortDirections: ["descend", "ascend"],
      render: (val) => <div className="text_overlap">{val ? "Yes" : "No"}</div>,
    },
    {
      title: "Rating Qantity",
      dataIndex: "ratingQantity",
      key: "ratingQantity ",
      width: "10%",
      sorter: (a, b) => a.ratingQantity - b.ratingQantity,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("ratingQantity", setIndex, index),
    },
    {
      title: "Rating Average",
      dataIndex: "ratingAverage",
      key: "ratingAverage",
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
          <button
            className="table_btn table_btn-edit"
            key="btnedit"
            onClick={() => {
              setcurrentRecord(record);
              setshowTour(true);
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

export default ToursColumns;
