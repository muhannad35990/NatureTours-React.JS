import React, { useState } from 'react';
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { GlobalOutlined, UserOutlined } from '@ant-design/icons';
import changeLanguage from '../../configs/internationalization/changeLanguage';
import getLanguage from '../../configs/internationalization/getLanguage';
import { useTranslation } from 'react-i18next'; // For translation
import { Link, useHistory } from 'react-router-dom';
import logo from '../../img/logo-green-1x.png';
function NavBar(props) {
  const { t } = useTranslation('words');
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  function handleMenuClick(e) {
    if (e.key === '1') changeLanguage('En');
    else changeLanguage('De');
    // message.info('Click on menu item.');
    // console.log('click', e);
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">English</Menu.Item>
      <Menu.Item key="2">Deutsche</Menu.Item>
    </Menu>
  );

  return (
    <div className="nav">
      <div className="nav__logo">
        <Link to="/">
          <img src={logo} alt="logo" className="nav__logo--img" />
        </Link>
      </div>
      <div className="nav__buttons-group">
        <Space wrap style={{ marginRight: '2rem', height: '100%' }}>
          <Dropdown.Button overlay={menu} icon={<GlobalOutlined />}>
            {getLanguage()}
          </Dropdown.Button>
        </Space>
        <button
          className={`btn ${isLogin ? 'btn--green' : 'btn--white'} navbtn`}
          onClick={() => {
            history.push('/login');
            setIsLogin(true);
          }}
        >
          {t('login')}
        </button>
        <button
          className={`btn ${isLogin ? 'btn--white' : 'btn--green'} navbtn`}
          onClick={() => {
            history.push('/register');
            setIsLogin(false);
          }}
        >
          {t('sign_up')}
        </button>
      </div>
    </div>
  );
}

export default NavBar;
