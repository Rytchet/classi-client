import React from 'react';
import {
  LoginPage,
  HomePage,
  ListingPage,
  ProfilePage,
  RegisterPage,
  CreateListingPage,
  SearchPage,
  AboutPage,
  EditProfilePage,
} from './pages/index.js';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/styles/index.css';

// Set up axios
import axios from 'axios';
axios.defaults.baseURL = 'https://classi-server.herokuapp.com/api';

// For debug
// axios.defaults.baseURL = 'http://localhost:5000/api';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={LoginPage} />

        <Route path="/register" exact component={RegisterPage} />

        <Route path="/listing/:id" component={ListingPage} />

        <Route path="/search" component={SearchPage} />

        <Route path="/About" exact component={AboutPage} />

        <PrivateRoute path="/profile" exact component={ProfilePage} />

        <PrivateRoute path="/editProfile" exact component={EditProfilePage} />

        <PrivateRoute
          path="/createListing"
          exact
          component={CreateListingPage}
        />

        {/* For now 404 goes to the main page */}
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}

export default App;
