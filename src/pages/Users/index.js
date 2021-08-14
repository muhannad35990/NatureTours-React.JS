import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteUserReview,
  GetUserReviews,
} from "../../store/actions/ReviewActions";
import { GetAllUsers } from "../../store/actions/userActions";
import UserModel from "../../components/Models/UserModel/UserModel";
import UserColumns from "./UserColumns";

function Users() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users.users);
  const [showUser, setShowUser] = useState(false);
  const [currentRecord, setcurrentRecord] = useState(null);

  const [index, setIndex] = useState(100);

  useEffect(() => {
    dispatch(GetAllUsers());
  }, []);

  const doTheDelete = () => {
    //delete review from the database
    dispatch(DeleteUserReview(currentRecord.id));
    dispatch(GetUserReviews(auth.user._id));
  };

  const columns = UserColumns(
    index,
    setIndex,
    doTheDelete,
    setShowUser,
    setcurrentRecord
  );
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
