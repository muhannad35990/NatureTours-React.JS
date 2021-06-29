import './App.scss';
import {
  Router,
  Switch,
  Route,
  withRouter,
  HashRouter,
} from 'react-router-dom';
import history from './history';
import LoginPage from './pages/login/Login.js';

function App() {
  return (
    <Router history={history}>
      <Route path="/login" component={LoginPage} />
    </Router>
  );
}

export default App;
