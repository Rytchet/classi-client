import React from 'react';
import AppNavbar from './components/AppNavbar';
import AppCarousel from './components/AppCarousel';
import Listings from './components/Listings';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClassicCars from './components/pages/ClassicCars';

function App() {
  return (
    <Router>
      <AppNavbar />

      <Listings />
    </Router>
  );
}

export default App;
