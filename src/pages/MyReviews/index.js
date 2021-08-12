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

import Highlighter from "react-highlight-words";
import get from "lodash.get";
import isequal from "lodash.isequal";

function MyReviews() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userReviews = useSelector((state) => state.reviews.userReviews);
  const [showReview, setShowReview] = useState(false);
  const [currentRecord, setcurrentRecord] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [index, setIndex] = useState(0);
  const refSearchInput = useRef();

  const backendImg = `${endpoints.BACKEND_URL}/img/tours/`;
  useEffect(() => {
    if (searchText === "" || searchText === null)
      dispatch(GetUserReviews(auth.user._id));
  }, [auth, searchText]);

  const doTheDelete = () => {
    //delete review from the database
    dispatch(DeleteUserReview(currentRecord.id));
    dispatch(GetUserReviews(auth.user._id));
  };
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
      ...getColumnSearchProps(["tour", "name"], refSearchInput),
    },
    {
      title: "Duration",
      dataIndex: ["tour", "duration"],
      key: ["tour", "duration"],
      width: "12rem",
      sorter: (a, b) => a.tour.duration - b.tour.duration,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(["tour", "duration"], refSearchInput),
    },
    {
      title: "Difficulty",
      dataIndex: ["tour", "difficulty"],
      key: ["tour", "difficulty"],
      width: "12rem",
      sorter: (a, b) => a.tour.difficulty.localeCompare(b.tour.difficulty),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(["tour", "difficulty"], refSearchInput),
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
      ...getColumnSearchProps(["review"], refSearchInput),
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
        <Table key={index} columns={columns} dataSource={userReviews} />
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
