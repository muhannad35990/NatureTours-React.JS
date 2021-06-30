import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import history from './history';
import LoginPage from './pages/login/Login.js';
import RegisterPage from './pages/register/Register.js';
import homePage from './pages/home/Home';
import NavBar from './components/navBar/NavBar';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <Router history={history}>
      <NavBar />
      <div className="app">
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route exact path="/" component={homePage} />
      </div>
    </Router>
  );
}

export default App;
