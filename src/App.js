import "./App.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import changeLanguage from "./configs/internationalization/changeLanguage";
import PageContainer from "./pages/pageContainer";
import Router from "./router";
import { autoLogin } from "./store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  useEffect(() => {
    changeLanguage(localStorage.getItem("i18nextLng"));
  }, []);

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) dispatch(autoLogin({ refreshToken }));
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
