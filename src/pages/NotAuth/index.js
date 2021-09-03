import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotAuth() {
  const history = useHistory();
  const { t } = useTranslation("words");
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => history.push("/")}>
          {top("Back_Home")}
        </Button>
      }
    />
  );
}

export default NotAuth;
