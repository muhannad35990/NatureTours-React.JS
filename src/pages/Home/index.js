import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.loggedIn) {
      auth.user.role === 'admin'
        ? history.push('/dashboard')
        : history.push('/userHome');
    }
  }, [auth]);
  return <div></div>;
}

export default Home;
