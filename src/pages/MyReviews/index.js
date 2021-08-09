import React, { useEffect } from "react";
import { Table, Input, Button, Space } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { GetUserReviews } from "../../store/actions/ReviewActions";
import Loading from "../../components/Loading";

function MyReviews() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userReviews = useSelector((state) => state.reviews.userReviews);
  useEffect(() => {
    dispatch(GetUserReviews(auth.user._id));
  }, [auth]);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: ["tour", "name"],
      key: "name",
      width: "30%",
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Duration",
      dataIndex: ["tour", "duration"],
      key: "duration",
      width: "20%",
      sorter: (a, b) => a.duration.length - b.duration.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Difficulty",
      dataIndex: ["tour", "difficulty"],
      key: "difficulty",
      sorter: (a, b) => a.difficulty.length - b.difficulty.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Price",
      dataIndex: ["tour", "price"],
      key: "price",

      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
      sorter: (a, b) => a.review.length - b.review.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      sorter: (a, b) => a.rating.length - b.rating.length,
      sortDirections: ["descend", "ascend"],
    },
  ];
  return (
    <div>
      {userReviews ? (
        <Table columns={columns} dataSource={userReviews} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default MyReviews;
