import React, { Component } from 'react';
import { Container, Card, CardColumns, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Listings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: true,
      listings: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listings !== this.props.listings) {
      this.setState({
        listings: this.props.listings,
      });
    }
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
          {this.state.listings.map(listing => (
            <Link to={'/listing/' + listing._id} key={listing._id}>
              <Card>
                <div
                  style={{
                    position: 'relative',
                    height: '180px',
                    width: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <Card.Img
                    variant="top"
                    style={{
                      overflow: 'hidden',
                      height: 'auto',
                      width: '100%',
                    }}
                    src={listing.photos[0]}
                  />
                </div>
                <Card.Body style={{ minHeight: '150px' }}>
                  <Card.Title>{listing.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {listing.car.year} {listing.car.make} {listing.car.model}
                  </Card.Subtitle>
                  <Card.Text>Click to view more details...</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    Price:{' '}
                    {listing.price.toLocaleString(navigator.language, {
                      minimumFractionDigits: 2,
                    })}
                  </small>
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
