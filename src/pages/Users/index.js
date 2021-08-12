import React, { useEffect, useRef, useState } from "react";
import { Table, Input, Button, Space, Rate, Popconfirm } from "antd";
import Icon, {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteUserReview,
  GetUserReviews,
} from "../../store/actions/ReviewActions";

import * as endpoints from "../../configs/endpointConfig";
import Avatar from "antd/lib/avatar/avatar";

import Highlighter from "react-highlight-words";
import get from "lodash.get";
import isequal from "lodash.isequal";

import { GetAllUsers } from "../../store/actions/userActions";
import UserModel from "../../components/Models/UserModel/UserModel";

function Users() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users.users);
  const [showUser, setShowUser] = useState(false);
  const [currentRecord, setcurrentRecord] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [index, setIndex] = useState(100);
  const refSearchInput = useRef();
  const backendImg = `${endpoints.BACKEND_URL}/img/users/`;
  useEffect(() => {
    dispatch(GetAllUsers());
  }, []);

  function getColumnSearchProps(dataIndex, searchInput) {
    return {
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => (searchInput = node)}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        get(record, dataIndex)
          ? get(record, dataIndex)
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.select(), 100);
        }
      },
      render: (text) =>
        isequal(searchedColumn, dataIndex) ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    };
  }
  const doTheDelete = () => {
    //delete review from the database
    dispatch(DeleteUserReview(currentRecord.id));
    dispatch(GetUserReviews(auth.user._id));
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    setIndex(index + 1);
  };
  const columns = [
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
      ...getColumnSearchProps("name", refSearchInput),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
      sorter: (a, b) => a.email - b.email,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("email", refSearchInput),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "10%",
      sorter: (a, b) => a.role.localeCompare(b.role),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("role", refSearchInput),
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

  return (
    <div>
      {users && (
        <Table key={index} columns={columns} dataSource={users} rowKey="_id" />
      )}
      <UserModel
        show={showUser}
        onCancel={() => setShowUser(false)}
        record={currentRecord}
      />
    </div>
  );
}

export default Users;
