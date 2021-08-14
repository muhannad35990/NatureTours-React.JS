import React from "react";
import Avatar from "antd/lib/avatar/avatar";
import { Space, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import * as endpoints from "../../configs/endpointConfig";
import getColumnSearchProps from "../../util/getColumnSearchProps";

function UserColumns(
  index,
  setIndex,
  doTheDelete,
  setShowUser,
  setcurrentRecord
) {
  const backendImg = `${endpoints.BACKEND_URL}/img/users/`;
  return [
    {
      key: "photo",
      width: "5rem",
      dataIndex: "photo", // this is the value that is parsed from the DB / server side
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
      sorter: (a, b) => a.email - b.email,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("email", setIndex, index),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "10%",
      sorter: (a, b) => a.role.localeCompare(b.role),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("role", setIndex, index),
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
              setShowUser(true);
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

export default UserColumns;
