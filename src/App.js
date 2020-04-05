import React from 'react';
import AppNavbar from './components/AppNavbar';
import AppCarousel from './components/AppCarousel';
import Listings from './components/Listings';
import Featured from './components/Featured';
import Login from './pages/Login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <AppNavbar />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/" exact>
          <AppCarousel />
          <br />
          <Listings />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
