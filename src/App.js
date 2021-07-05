import "./App.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import changeLanguage from "./configs/internationalization/changeLanguage";
import PageContainer from "./pages/pageContainer";
import Router from "./router";
function App() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  useEffect(() => {
    changeLanguage(localStorage.getItem("i18nextLng"));
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
