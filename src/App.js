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
      <div className="Nav">
        <AppNavbar />
      </div>
      <Route
        exact
        path="/"
        render={props => (
          <React.Fragment>
            <AppCarousel />
          </React.Fragment>
        )}
      />
      <Route path="/classical-cars" component={ClassicCars} />
      <Listings />
    </Router>
  );
}

export default App;
