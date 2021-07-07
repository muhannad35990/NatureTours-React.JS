import React, { useEffect } from 'react';
import { Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { removeAllAlerts } from '../../store/actions/AlertActions';

function AutoHideAlert({ type, message, title, timeout }) {
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch(removeAllAlerts());
  }, 10000);

  const handleClose = () => dispatch(removeAllAlerts());
  return (
    <Alert
      title={title}
      description={message}
      type={type}
      closable
      afterClose={handleClose}
    />
  );
}

export default AutoHideAlert;
