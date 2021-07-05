import './App.scss';
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   Redirect,
// } from 'react-router-dom';
import history from './history';

import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import changeLanguage from './configs/internationalization/changeLanguage';
import Me from './pages/me/Me';
import PrivateRoute from './router/PrivateRoute';
import { GuardProvider, GuardedRoute } from 'react-router-guards';
import PageContainer from './pages/pageContainer';
import Router from './router';
function App() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  useEffect(() => {
    changeLanguage(localStorage.getItem('i18nextLng'));
  }, []);

  return (
    <Router>
      {(content, routeProps) => (
        <PageContainer {...routeProps}>{content}</PageContainer>
      )}
    </Router>
  );
}

export default App;

{
  /* <Router history={history}>
<NavBar />
<div className="app">
  <Switch>
    <PrivateRoute
      exact
      path="/"
      component1={Dashboard}
      component2={UserHome}
    />
    <Route path="/register">
      <RegisterPage />
    </Route>
    <Route path="/UserHome">
      <UserHome />
    </Route>
    <Route exact path="/login">
      <LoginPage />
    </Route>

  </Switch>
</div>
</Router> */
}
