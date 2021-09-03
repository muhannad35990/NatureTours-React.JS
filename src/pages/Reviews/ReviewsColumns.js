import React from "react";
import { Space, Popconfirm, Rate } from "antd";
import { DeleteOutlined, FileImageOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import * as endpoints from "../../configs/endpointConfig";
import getColumnSearchProps from "../../util/getColumnSearchProps";
import { useTranslation } from "react-i18next";

function ReviewsColumns(index, setIndex, doTheDelete, setcurrentRecord) {
  const backendImg = `${endpoints.BACKEND_URL}/img/users/`;
  const { t } = useTranslation("words");
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
      title: t("Name"),
      dataIndex: ["user", "name"],
      key: "name",
      width: "15%",
      sorter: (a, b) => a.user.name.localeCompare(b.user.name),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(["user", "name"], setIndex, index),
    },
    {
      title: t("firstname"),
      dataIndex: ["user", "FirstName"],
      key: "FirstName",
      width: "15%",
      sorter: (a, b) => a.user.FirstName.localeCompare(b.user.FirstName),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(["user", "FirstName"], setIndex, index),
    },
    {
      title: t("lastname"),
      dataIndex: ["user", "LastName"],
      key: "LastName",
      width: "15%",
      sorter: (a, b) => a.user.LastName.localeCompare(b.user.LastName),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(["user", "LastName"], setIndex, index),
    },
    {
      title: t("Tour"),
      dataIndex: ["tour", "name"],
      key: "review",
      width: "15%",
      sorter: (a, b) => a.tour.name.localeCompare(b.tour.name),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(["tour", "name"], setIndex, index),
    },
    {
      title: t("Review"),
      dataIndex: "review",
      key: "review",
      width: "30%",
      sorter: (a, b) => a.review.localeCompare(b.review),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("review", setIndex, index),
    },

    {
      title: t("Rating"),
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
      title: t("Action"),
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <Popconfirm
            title={t("Are_you_sure_to_delete_this_review")}
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

export default ReviewsColumns;
