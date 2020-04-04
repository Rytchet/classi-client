import React from 'react';
import AppNavbar from './components/AppNavbar';
import AppCarousel from './components/AppCarousel';
import Listings from './components/Listings';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Featured from './components/Featured';

function App() {
  return (
    <Router>
      <AppNavbar />
      <AppCarousel/>
      <br />
      <Listings />
    </Router>
  );
}

export default App;
