import React, { useState } from "react";

import {
  BarChartOutlined,
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
import Bookings from "../Bookings";
import Statistics from "../Statistics/Statistics";
import { useTranslation } from "react-i18next";

function Dashboard() {
  const { t } = useTranslation("words");
  const [currentTab, setcurrentTab] = useState("settings");
  const auth = useSelector((state) => state.auth);
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
            <a>{t("SETTINGS")}</a>
          </li>
          <li
            className={`sidebar__item ${
              currentTab === "bookings" ? "sidebar__item__selected" : ""
            }`}
            onClick={() => setcurrentTab("bookings")}
          >
            <BookOutlined style={{ fontSize: 20 }} className="sidebar__icon" />
            <a>{t("MY_BOOKINGS")}</a>
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
            <a>{t("my_reviews")}</a>
          </li>
          <li
            className={`sidebar__item ${
              currentTab === "Statistics" ? "sidebar__item__selected" : ""
            }`}
            onClick={() => setcurrentTab("Statistics")}
          >
            <BarChartOutlined
              style={{ fontSize: 20 }}
              className="sidebar__icon"
            />
            <a>{t("Statistics")}</a>
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
                {t("ADMINS_ONLY")}
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
                <a>{t("manage_tours")}</a>
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

                <a>{t("manage_users")}</a>
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
                <a>{t("manage_reviews")}</a>
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
                <a>{t("manage_bookings")}</a>
              </li>
            </div>
          )}
        </ul>
        <p className="copywrite">
          &copy;2021 by MUHANNAD HAMMADA . {t("All_rights_reserved")}.
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
        ) : currentTab === "Statistics" ? (
          <Statistics />
        ) : currentTab === "manage_users" ? (
          <Users />
        ) : currentTab === "manage_tours" ? (
          <Tours />
        ) : currentTab === "manage_reviews" ? (
          <Reviews />
        ) : currentTab === "manage_bookings" ? (
          <Bookings />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Dashboard;
