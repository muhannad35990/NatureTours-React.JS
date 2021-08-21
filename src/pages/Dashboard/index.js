import React, { useState } from "react";

import {
  BookOutlined,
  CarOutlined,
  CommentOutlined,
  DollarCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { MyBookings, Me, MyReviews, Billing } from "../index";

import { Divider } from "antd";
import { useSelector } from "react-redux";
import Users from "../Users";
import Tours from "../Tours";
import Reviews from "../Reviews";

function Dashboard() {
  const [currentTab, setcurrentTab] = useState("settings");
  const auth = useSelector((state) => state.auth);
  console.log(" int the dashboard");
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
          {/* admins only section */}
          {auth.user.role === "admin" && (
            <div>
              <Divider
                style={{
                  color: "#fff",
                  fontSize: "1.3rem",
                  borderTopColor: "#777",
                }}
              >
                ADMINS ONLY
              </Divider>
              <li
                className={`sidebar__item ${
                  currentTab === "manage_tours" ? "sidebar__item__selected" : ""
                }`}
                onClick={() => setcurrentTab("manage_tours")}
              >
                <CarOutlined
                  style={{ fontSize: 20 }}
                  className="sidebar__icon"
                />
                <a>manage tours</a>
              </li>
              <li
                className={`sidebar__item ${
                  currentTab === "manage_users" ? "sidebar__item__selected" : ""
                }`}
                onClick={() => setcurrentTab("manage_users")}
              >
                <UserOutlined
                  style={{ fontSize: 20 }}
                  className="sidebar__icon"
                />

                <a>manage users</a>
              </li>
              <li
                className={`sidebar__item ${
                  currentTab === "manage_reviews"
                    ? "sidebar__item__selected"
                    : ""
                }`}
                onClick={() => setcurrentTab("manage_reviews")}
              >
                <CommentOutlined
                  style={{ fontSize: 20 }}
                  className="sidebar__icon"
                />
                <a>manage reviews</a>
              </li>
              <li
                className={`sidebar__item ${
                  currentTab === "manage_bookings"
                    ? "sidebar__item__selected"
                    : ""
                }`}
                onClick={() => setcurrentTab("manage_bookings")}
              >
                <BookOutlined
                  style={{ fontSize: 20 }}
                  className="sidebar__icon"
                />
                <a>manage bookings</a>
              </li>
            </div>
          )}
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
        ) : currentTab === "manage_users" ? (
          <Users />
        ) : currentTab === "manage_tours" ? (
          <Tours />
        ) : currentTab === "manage_reviews" ? (
          <Reviews />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Dashboard;
