import React, { useState, useEffect } from "react";
import { Menu, Dropdown, Button, message, Space, Tooltip, Image } from "antd";
import {
  DownOutlined,
  GlobalOutlined,
  UserOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import changeLanguage from "../../configs/internationalization/changeLanguage";
import getLanguage from "../../configs/internationalization/getLanguage";
import { useTranslation } from "react-i18next"; // For translation
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../../img/logo-green-1x.png";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "antd/lib/avatar/avatar";
import Flags from "country-flag-icons/react/3x2";
import { logUserOut } from "../../store/actions/authActions";
import * as endpoints from "../../configs/endpointConfig";

function NavBar(props) {
  const { t } = useTranslation("words");
  const location = useLocation();
  const language = getLanguage();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  function handleMenuClick(e) {
    if (e.key === "1") changeLanguage("En");
    else changeLanguage("De");
  }

  const logout = () => {
    dispatch(logUserOut());
    history.push("login");
  };
  const usermenu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<UserOutlined />}
        onClick={() => history.push("/Me")}
      >
        {t("profile")}
      </Menu.Item>
      <Menu.Item key="2" icon={<LoginOutlined />} onClick={logout}>
        {t("logout")}
      </Menu.Item>
    </Menu>
  );
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <div className="language">
          <h4>English </h4>
          <Flags.US title="United States" className="flag" />
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div className="language">
          <h4>Deutsche </h4>
          <Flags.DE title="Germany" className="flag" />
        </div>
      </Menu.Item>
    </Menu>
  );
  const auth = useSelector((state) => state.auth);
  return (
    <div className="nav">
      <div className="nav__logo">
        <Link to="/">
          <img src={logo} alt="logo" className="nav__logo--img" />
        </Link>
      </div>
      <div className="nav__buttons-group">
        <Space wrap style={{ marginRight: "2rem", height: "100%" }}>
          <Dropdown.Button overlay={menu} icon={<GlobalOutlined />}>
            {language === "En" ? (
              <Flags.US title="United States" className="flag" />
            ) : (
              <Flags.DE title="Germany" className="flag" />
            )}
          </Dropdown.Button>
        </Space>
        {!auth.loggedIn ? (
          <>
            <button
              className={`btn ${isLogin ? "btn--green" : "btn--white"} navbtn`}
              onClick={() => {
                history.push("/login");
                setIsLogin(true);
              }}
            >
              {t("login")}
            </button>
            <button
              className={`btn ${isLogin ? "btn--white" : "btn--green"} navbtn`}
              onClick={() => {
                history.push("/register");
                setIsLogin(false);
              }}
            >
              {t("sign_up")}
            </button>
          </>
        ) : (
          <Dropdown overlay={usermenu}>
            <Button>
              <span style={{ marginRight: "1rem" }}>{auth.user.FirstName}</span>
              <Avatar
                src={`${endpoints.BACKEND_URL}/img/users/${auth.user.photo}`}
                icon={<UserOutlined />}
              />
            </Button>
          </Dropdown>
        )}
      </div>
    </div>
  );
}

export default NavBar;
