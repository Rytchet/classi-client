import React, { Component } from 'react';
import { Container, Card, CardColumns, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Listings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      listings: [],
    };
  }

  componentDidMount() {
    axios.get('/listings').then((res) => {
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
            <Spinner animation="border" variant="secondary" />
            <h1>Firing up the V8...</h1>
          </center>
        </div>
      );
    }

    return (
      <Container className="mt-5">
        <CardColumns>
          {this.state.listings.map((listing) => (
            <Link to={'/listing/' + listing._id}>
              <Card key={listing._id}>
                <Card.Img variant="top" src="/testcar.png" />
                <Card.Body>
                  <Card.Title>{listing.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {listing.car.year} {listing.car.make} {listing.car.model}
                  </Card.Subtitle>
                  <Card.Text>
                    {listing.description || 'There is no description'}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Price: {listing.price}</small>
                </Card.Footer>
              </Card>
            </Link>
          ))}
        </CardColumns>
      </Container>
    );
  }
}

export default Listings;
