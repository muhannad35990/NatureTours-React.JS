import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";

const PrivateRoute = ({
  component1: Component1,
  component2: Component2,
  ...rest
}) => {
  const location = useLocation();
  const auth = useSelector((state) => state.auth);
  console.log("rendering");
  return (
    <Route {...rest}>
      {auth.loggedIn ? (
        auth.user.role === "admin" ? (
          <Component1 />
        ) : (
          <Component2 />
        )
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )}
    </Route>
  );
};

export default PrivateRoute;
