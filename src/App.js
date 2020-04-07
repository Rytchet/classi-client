import React from 'react';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ListingPage from './ListingPage';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/styles/index.css';

// Set up axios
import axios from 'axios';
axios.defaults.baseURL = 'https://classi-server.herokuapp.com/api';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={LoginPage} />

        <Route path="/listing/:id" component={ListingPage} />

        <PrivateRoute path="/" exact component={HomePage} />

        {/* TODO: 404 page 
          <Route component={NotFound}></Route> 
          */}
      </Switch>
    </Router>
  );
}

export default App;
