import { Col, Image, PageHeader, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import { useHistory } from "react-router-dom";

function Me() {
  const history = useHistory();
  return (
    <div className="Me">
      <div className="user__profile">
        <PageHeader
          className="site-page-header"
          onBack={() => history.push("/")}
          title="Main"
        />
        ,
        <Row>
          <Col span={18} push={6}></Col>
          <Col span={6} pull={18}>
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              src={
                <Image src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
            />
          </Col>
        </Row>
        ,
      </div>
    </div>
  );
}

export default Me;
