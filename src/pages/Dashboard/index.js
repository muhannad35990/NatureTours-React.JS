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
          >
            <SettingOutlined
              style={{ fontSize: 20 }}
              className="sidebar__icon"
            />
            <Link onClick={() => setcurrentTab("settings")}>SETTINGS</Link>
          </li>
          <li
            className={`sidebar__item ${
              currentTab === "bookings" ? "sidebar__item__selected" : ""
            }`}
          >
            <BookOutlined style={{ fontSize: 20 }} className="sidebar__icon" />
            <Link onClick={() => setcurrentTab("bookings")}>MY BOOKINGS</Link>
          </li>
          <li
            className={`sidebar__item ${
              currentTab === "reviews" ? "sidebar__item__selected" : ""
            }`}
          >
            <CommentOutlined
              style={{ fontSize: 20 }}
              className="sidebar__icon"
            />
            <Link onClick={() => setcurrentTab("reviews")}>my reviews</Link>
          </li>
          <li
            className={`sidebar__item ${
              currentTab === "billing" ? "sidebar__item__selected" : ""
            }`}
          >
            <DollarCircleOutlined
              style={{ fontSize: 20 }}
              className="sidebar__icon"
            />
            <Link onClick={() => setcurrentTab("billing")}>billing</Link>
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
