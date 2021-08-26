import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBooking,
  getAllBookings,
} from "../../store/actions/BookingActions";

import BookingColumns from "./BookingColumns";

function Bookings() {
  const dispatch = useDispatch();
  const bookings = useSelector((state) => state.bookings.bookings);
  const [currentRecord, setcurrentRecord] = useState(null);
  const [index, setIndex] = useState(200);

  useEffect(() => {
    dispatch(getAllBookings());
  }, []);
  const doTheDelete = (booking) => {
    dispatch(deleteBooking(booking));
  };

  const columns = BookingColumns(
    index,
    setIndex,
    doTheDelete,
    setcurrentRecord
  );

  return (
    <div>
      {bookings && (
        <Table
          key={index}
          columns={columns}
          dataSource={bookings}
          rowKey="_id"
        />
      )}
    </div>
  );
}

export default Bookings;
