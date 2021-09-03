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
import { useTranslation } from "react-i18next";

function ToursColumns(
  index,
  setIndex,
  doTheDelete,
  setshowTour,
  setcurrentRecord
) {
  const backendImg = `${endpoints.BACKEND_URL}/img/tours/`;
  const { t } = useTranslation("words");

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
      title: t("Name"),
      dataIndex: "name",
      key: "name",
      width: "20%",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("name", setIndex, index),
    },
    {
      title: t("Difficulty"),
      dataIndex: "difficulty",
      key: "difficulty",
      width: "10%",
      sorter: (a, b) => a.difficulty.localeCompare(b.difficulty),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("difficulty", setIndex, index),
    },
    {
      title: t("Duration"),
      dataIndex: "duration",
      key: "duration",
      width: "10%",
      sorter: (a, b) => a.duration - b.duration,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("duration", setIndex, index),
    },
    {
      title: t("Max_Group_Size"),
      dataIndex: "maxGroupSize",
      key: "maxGroupSize",
      width: "15%",
      sorter: (a, b) => a.maxGroupSize - b.maxGroupSize,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("maxGroupSize", setIndex, index),
    },
    {
      title: t("Price"),
      dataIndex: "price",
      key: "price",
      width: "5%",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("price", setIndex, index),
    },

    {
      title: t("secret_Tour"),
      dataIndex: "secretTour",
      key: "secretTour",
      width: "10%",
      sorter: (a, b) => a.ratingAverage - b.ratingAverage,
      sortDirections: ["descend", "ascend"],
      render: (val) => <div className="text_overlap">{val ? "Yes" : "No"}</div>,
    },
    {
      title: t("Rating_Qantity"),
      dataIndex: "ratingQantity",
      key: "ratingQantity ",
      width: "10%",
      sorter: (a, b) => a.ratingQantity - b.ratingQantity,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("ratingQantity", setIndex, index),
    },
    {
      title: t("Rating_Average"),
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
      title: t("Action"),
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
            title={t("Are_you_sure_to_delete_this_tour")}
            onConfirm={() => doTheDelete(record.id)}
            okText={t("Yes")}
            cancelText={t("No")}
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
