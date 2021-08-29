import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading";

function SaveOAuthToken() {
  const routeParams = useParams();
  useEffect(() => {
    console.log(routeParams.token);

    localStorage.setItem("refreshToken", routeParams.token);
  }, [routeParams]);
  return (
    <div>
      <Loading />
    </div>
  );
}

export default SaveOAuthToken;
