import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import history from "./history";
import LoginPage from "./pages/login/Login.js";
import RegisterPage from "./pages/register/Register.js";
import Dashboard from "./pages/Dashboard/Dashboard";
import NavBar from "./components/navBar/NavBar";
import forgotPasswordPage from "./pages/forgotPassword/ForgotPassword";
import resetPasswordPage from "./pages/resetPassword/ResetPassword";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import UserHome from "./pages/userHome/UserHome";
import changeLanguage from "./configs/internationalization/changeLanguage";
import Me from "./pages/me/Me";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  useEffect(() => {
    changeLanguage(localStorage.getItem("i18nextLng"));
  }, []);
  const auth = useSelector((state) => state.auth);

  return (
    <Router history={history}>
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

          {/* {auth.loggedIn ? (
            <Route exact path="/">
              {auth.user.role !== null && auth.user.role === "admin" ? (
                <Dashboard />
              ) : (
                <UserHome />
              )}
            </Route>
          ) : (
            <Redirect exact from="/" to="/login" />
          )}
          <Route path="/register">
            {!auth.loggedIn ? (
              <RegisterPage />
            ) : (
              <Redirect exact from="/register" to="/" />
            )}
          </Route>
          <Route path="/login">
            {!auth.loggedIn ? (
              <LoginPage />
            ) : (
              <Redirect exact from="/login" to="/" />
            )}
          </Route>
          <Route path="/me">{auth.loggedIn ? <Me /> : <LoginPage />}</Route>
          <Route
            path="/forgotPassword"
            component={!auth.loggedIn && forgotPasswordPage}
          />

          <Route
            path="/resetPassword"
            component={auth.loggedIn ? resetPasswordPage : LoginPage}
          /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
