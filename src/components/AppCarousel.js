import React, { Component } from 'react';
import { Carousel, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import './AppCarousel.css';


class AppCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      listings: []
    };
  }

  componentDidMount() {
    axios.get('https://classi-server.herokuapp.com/api/listings/popular').then(res => {
      this.setState({
        listings: res.data,
        isLoaded: true
      });
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>
          <center>
            <Spinner animation="border" variant="secondary" />
            <h1>Loading...</h1>
          </center>
        </div>
      );
    }
    return (
      <center>
      <Carousel className="w-10 h-10">
        {this.state.listings.map(listing =>
          <Carousel.Item key={listing._id}>
            <img
              style={{ flex: 1, alignItems: 'center' }}
              className="w-10 h-10"
              src="/testcar.png"
              alt="First slide"
            />
          <Carousel.Caption>
            <Alert variant="info">
        <h3>{listing.car.year} {listing.car.make} {listing.car.model} </h3>
            <p>{listing.description || 'There is no description'}</p>
            </Alert>

          </Carousel.Caption>
        </Carousel.Item>
        )}
 
      </Carousel>
      </center>
    );
  }
}

export default AppCarousel;
