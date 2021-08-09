import React, { useEffect } from "react";
import PropTypes from "prop-types";
import NavBar from "../../components/navBar";
import Footer from "../../components/Footer/Footer";

const PageContainer = ({ children, history }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <NavBar />
      <main className="container">{children}</main>
    </div>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node,
};

export default PageContainer;
