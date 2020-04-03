import React from 'react';
import AppNavbar from './components/AppNavbar';
import AppCarousel from './components/AppCarousel';
import Listings from './components/Listings';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClassicalCars from './components/pages/ClassicCars';

function App() {
  return (
    <Router>
      <div className="Nav">
        <Route
          exact
          path="/"
          render={props => (
            <React.Fragment>
              <AppNavbar />
              <AppCarousel />
            </React.Fragment>
          )}
        />
        <Route path="/classical-cars" component={ClassicalCars} />
        <Listings />
      </div>
    </Router>
  );
}

export default App;
