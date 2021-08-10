import React, { useState } from "react";

import {
  BookOutlined,
  CommentOutlined,
  DollarCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { MyBookings, Me, MyReviews, Billing } from "../index";
import { Link } from "react-router-dom";

function Dashboard() {
  const [currentTab, setcurrentTab] = useState("settings");
  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <div className="sidebar">
        <ul className="sidebar__items">
          <li
            className={`sidebar__item ${
              currentTab === "settings" ? "sidebar__item__selected" : ""
            }`}
            onClick={() => setcurrentTab("settings")}
          >
            <SettingOutlined
              style={{ fontSize: 20 }}
              className="sidebar__icon"
            />
            <a>SETTINGS</a>
          </li>
          <li
            className={`sidebar__item ${
              currentTab === "bookings" ? "sidebar__item__selected" : ""
            }`}
            onClick={() => setcurrentTab("bookings")}
          >
            <BookOutlined style={{ fontSize: 20 }} className="sidebar__icon" />
            <a>MY BOOKINGS</a>
          </li>
          <li
            className={`sidebar__item ${
              currentTab === "reviews" ? "sidebar__item__selected" : ""
            }`}
            onClick={() => setcurrentTab("reviews")}
          >
            <CommentOutlined
              style={{ fontSize: 20 }}
              className="sidebar__icon"
            />
            <a>my reviews</a>
          </li>
          <li
            className={`sidebar__item ${
              currentTab === "billing" ? "sidebar__item__selected" : ""
            }`}
            onClick={() => setcurrentTab("billing")}
          >
            <DollarCircleOutlined
              style={{ fontSize: 20 }}
              className="sidebar__icon"
            />
            <a>billing</a>
          </li>
        </ul>
        <p className="copywrite">
          &copy;2021 by MUHANNAD HAMMADA . All rights reserved.
        </p>
      </div>

      <div style={{ margin: "5rem 2rem", width: "100%", height: "100%" }}>
        {currentTab === "settings" ? (
          <Me />
        ) : currentTab === "bookings" ? (
          <MyBookings />
        ) : currentTab === "reviews" ? (
          <MyReviews />
        ) : currentTab === "billing" ? (
          <Billing />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Dashboard;
