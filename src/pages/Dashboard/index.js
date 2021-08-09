import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import SideBar from "../../components/sideBar";

import { MyBookings, Me, MyReviews, Billing } from "../index";

function Dashboard() {
  const location = useLocation();
  console.log("in the dashboard");

  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <SideBar />
      <div style={{ margin: "5rem 2rem", width: "100%", height: "100%" }}>
        {location.pathname === "/me" || location.pathname === "/Me" ? (
          <Me />
        ) : location.pathname === "/myBookings" ? (
          <MyBookings />
        ) : location.pathname === "/myReviews" ? (
          <MyReviews />
        ) : location.pathname === "/billing" ? (
          <Billing />
        ) : (
          ""
        )}{" "}
      </div>
    </div>
  );
}

export default Dashboard;
