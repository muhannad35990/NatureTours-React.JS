import React, { useEffect } from "react";
import PropTypes from "prop-types";
import NavBar from "../../components/navBar";

const PageContainer = ({ children, history }) => {
  return (
    <div>
      <NavBar />
      <main className="container">{children}</main>
      <footer />
    </div>
  );
};

PageContainer.propTypes = {
  children: PropTypes.node,
};

export default PageContainer;
