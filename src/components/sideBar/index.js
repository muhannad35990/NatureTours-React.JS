import React, { useState } from "react";

import {
  BookOutlined,
  CommentOutlined,
  DollarCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
function SideBar() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <ul className="sidebar__items">
        <li
          className={`sidebar__item ${
            location.pathname === "/me" || location.pathname === "/Me"
              ? "sidebar__item__selected"
              : ""
          }`}
        >
          <SettingOutlined style={{ fontSize: 20 }} className="sidebar__icon" />
          <Link to="/me">SETTINGS</Link>
        </li>
        <li
          className={`sidebar__item ${
            location.pathname === "/myBookings" ? "sidebar__item__selected" : ""
          }`}
        >
          <BookOutlined style={{ fontSize: 20 }} className="sidebar__icon" />
          <Link to="/myBookings">MY BOOKINGS</Link>
        </li>
        <li
          className={`sidebar__item ${
            location.pathname === "/myReviews" ? "sidebar__item__selected" : ""
          }`}
        >
          <CommentOutlined style={{ fontSize: 20 }} className="sidebar__icon" />
          <Link to="/myReviews">my reviews</Link>
        </li>
        <li
          className={`sidebar__item ${
            location.pathname === "/billing" ? "sidebar__item__selected" : ""
          }`}
        >
          <DollarCircleOutlined
            style={{ fontSize: 20 }}
            className="sidebar__icon"
          />
          <Link to="/billing">billing</Link>
        </li>
      </ul>
      <p className="copywrite">
        &copy;2021 by MUHANNAD HAMMADA . All rights reserved.
      </p>
    </div>
  );
}

export default SideBar;
