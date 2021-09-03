import React from "react";
import { Space, Popconfirm, Rate } from "antd";
import { DeleteOutlined, FileImageOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import * as endpoints from "../../configs/endpointConfig";
import getColumnSearchProps from "../../util/getColumnSearchProps";
import { useTranslation } from "react-i18next";

function BookingColumns(index, setIndex, doTheDelete, setcurrentRecord) {
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
      title: t("Price"),
      dataIndex: "price",
      key: "price",
      width: "5%",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("price", setIndex, index),
    },

    {
      title: t("Action"),
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this booking?"
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

export default BookingColumns;
