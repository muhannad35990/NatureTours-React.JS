import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NotFound() {
  const history = useHistory();
  const { t } = useTranslation("words");
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => history.push("/")}>
          {t("Back_Home")}
        </Button>
      }
    />
  );
}
export default NotFound;
