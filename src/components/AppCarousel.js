import React, { Component } from 'react';
import { Carousel, Spinner } from 'react-bootstrap';
import axios from 'axios';
import './styles/AppCarousel.css';

class AppCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      listings: [],
    };
  }

  componentDidMount() {
    axios.get('/listings/popular').then(res => {
      this.setState({
        listings: res.data,
        isLoaded: true,
      });
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div>
          <center>
            <br />
            <Spinner animation="border" variant="secondary" />
            <h1>Checking Oil Levels... (loading carousel)</h1>
          </center>
          <br />
        </div>
      );
    }

    return (
      <center>
        <Carousel className="d-block w-40">
          {this.state.listings.slice(0, 5).map(listing => (
            <Carousel.Item fade="true" key={listing._id}>
              <img
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}
                className="d-block"
                src="/testcar.png"
                alt="First slide"
                width="50%"
              />
              <Carousel.Caption>
                <h3 href="#">
                  {listing.car.year} {listing.car.make} {listing.car.model}
                </h3>
                <p>
                  {listing.email || 'Click To View Details'} | Views:{' '}
                  {listing.times_viewed}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </center>
    );
  }
}

export default AppCarousel;
