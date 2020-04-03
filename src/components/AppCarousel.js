import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import logo from '../classi.png';
import testImage from '../testcar.png';

class AppCarousel extends Component {
  render() {
    return (
      <Carousel className="rows-cols-1 w-40 h-25">
        <Carousel.Item>
          <img
            style={{ flex: 1, alignItems: 'center' }}
            className="d-block w-100 h-25"
            src={testImage}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 h-25"
            src={testImage}
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={testImage} alt="Third slide" />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
}

export default AppCarousel;
