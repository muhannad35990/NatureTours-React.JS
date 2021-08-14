import React, { useEffect, useState } from "react";
import { Table, Space, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteUserReview,
  GetUserReviews,
} from "../../store/actions/ReviewActions";
import * as endpoints from "../../configs/endpointConfig";
import Avatar from "antd/lib/avatar/avatar";
import { GetAllUsers } from "../../store/actions/userActions";
import UserModel from "../../components/Models/UserModel/UserModel";
import getColumnSearchProps from "../../util/getColumnSearchProps";

function Tours() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const tours = useSelector((state) => state.tours.tours);
  const [showTour, setshowTour] = useState(false);
  const [currentRecord, setcurrentRecord] = useState(null);

  const [index, setIndex] = useState(100);

  const backendImg = `${endpoints.BACKEND_URL}/img/users/`;
  useEffect(() => {
    dispatch(GetAllUsers());
  }, []);

  const doTheDelete = () => {
    //delete review from the database
    dispatch(DeleteUserReview(currentRecord.id));
    dispatch(GetUserReviews(auth.user._id));
  };

  const columns = [
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
      ...getColumnSearchProps(
        "name",

        setIndex,
        index
      ),
    },
    {
      title: "Difficulty",
      dataIndex: "difficulty",
      key: "difficulty",
      width: "30%",
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
      ...getColumnSearchProps(
        "duration",

        setIndex,
        index
      ),
    },
    {
      title: "Max Group Size",
      dataIndex: "maxGroupSize",
      key: "maxGroupSize",
      width: "10%",
      sorter: (a, b) => a.maxGroupSize - b.maxGroupSize,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(
        "maxGroupSize",

        setIndex,
        index
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "10%",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(
        "price",

        setIndex,
        index
      ),
    },
    {
      title: "Address ",
      dataIndex: "address ",
      key: "address ",
      width: "10%",
      sorter: (a, b) => a.address.localeCompare(b.address),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(
        "address ",

        setIndex,
        index
      ),
    },
    {
      title: "secret Tour",
      dataIndex: "secretTour",
      key: "secretTour",
      width: "10%",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Rating Qantity ",
      dataIndex: "ratingQantity ",
      key: "ratingQantity ",
      width: "10%",
      sorter: (a, b) => a.ratingQantity - b.ratingQantity,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(
        "ratingQantity ",

        setIndex,
        index
      ),
    },
    {
      title: "Rating Average",
      dataIndex: "ratingAverage ",
      key: "ratingAverage ",
      width: "10%",
      sorter: (a, b) => a.ratingAverage - b.ratingAverage,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(
        "ratingAverage ",

        setIndex,
        index
      ),
    },
    {
      title: "start Dates",
      dataIndex: "startDates ",
      key: "startDates ",
      width: "10%",
      sorter: (a, b) => a.startDates - b.startDates,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(
        "startDates ",

        setIndex,
        index
      ),
    },
    {
      title: "Description ",
      dataIndex: "description ",
      key: "description ",
      width: "10%",
      sorter: (a, b) => a.description.localeCompare(b.description),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(
        "description ",

        setIndex,
        index
      ),
    },
    {
      title: "start Location",
      dataIndex: "startLocation ",
      key: "startLocation ",
      width: "10%",
      sorter: (a, b) => a.startLocation.localeCompare(b.startLocation),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(
        "startLocation ",

        setIndex,
        index
      ),
    },
    {
      title: "Guides",
      dataIndex: "guides ",
      key: "guides ",
      width: "10%",
      sorter: (a, b) => a.guides.localeCompare(b.guides),
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps(
        "guides ",

        setIndex,
        index
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

  return (
    <div>
      {tours && (
        <Table key={index} columns={columns} dataSource={tours} rowKey="_id" />
      )}
      <UserModel
        show={showTour}
        onCancel={() => setshowTour(false)}
        record={currentRecord}
      />
    </div>
  );
}

export default Tours;
