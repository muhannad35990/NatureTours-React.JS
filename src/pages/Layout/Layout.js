import React from "react";
import SideBar from "../../components/sideBar";
import Routes from "../../router/routes";

function Layout() {
  return (
    <div>
      <SideBar />
      <Routes />
    </div>
  );
}

export default Layout;
