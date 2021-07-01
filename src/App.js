import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import history from './history';
import LoginPage from './pages/login/Login.js';
import RegisterPage from './pages/register/Register.js';
import Dashboard from './pages/Dashboard/Dashboard';
import NavBar from './components/navBar/NavBar';
import forgotPasswordPage from './pages/forgotPassword/ForgotPassword';
import resetPasswordPage from './pages/resetPassword/ResetPassword';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserHome from './pages/userHome/UserHome';
import changeLanguage from './configs/internationalization/changeLanguage';

function App() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  useEffect(() => {
    console.log('chaning the language');
    changeLanguage(localStorage.getItem('i18nextLng'));
  }, []);
  const auth = useSelector((state) => state.auth);

  return (
    <Router history={history}>
      <NavBar />
      <div className="app">
        <Switch>
          <Route exact path="/">
            {auth.loggedIn ? (
              auth.user.role !== null && auth.user.role === 'admin' ? (
                <Dashboard />
              ) : (
                <UserHome />
              )
            ) : (
              <LoginPage />
            )}
          </Route>
          <Route
            exact
            path="/forgotPassword"
            component={!auth.loggedIn && forgotPasswordPage}
          />
          <Route
            exact
            path="/register"
            component={!auth.loggedIn && RegisterPage}
          />
          <Route exact path="/login" component={!auth.loggedIn && LoginPage} />

          <Route
            exact
            path="/resetPassword"
            component={auth.loggedIn ? resetPasswordPage : LoginPage}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
