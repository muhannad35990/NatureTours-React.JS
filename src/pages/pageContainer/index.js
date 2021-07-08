import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import NavBar from '../../components/navBar';
import { useSelector } from 'react-redux';

const PageContainer = ({ children, history }) => {
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (!auth.user) history.push('/login');
  }, [auth]);
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
