import "./App.scss";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import changeLanguage from "./configs/internationalization/changeLanguage";
import PageContainer from "./pages/pageContainer";
import Router from "./router";
import { autoLogin } from "./store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import mapboxgl from "!mapbox-gl";
function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    Aos.init({ duration: 2000 });
    changeLanguage(localStorage.getItem("i18nextLng"));
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) dispatch(autoLogin({ refreshToken }));
    mapboxgl.setRTLTextPlugin(
      "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
      null,
      true // Lazy load the plugin
    );
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
