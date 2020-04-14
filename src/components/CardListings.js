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
                    overflow: 'hidden',
                    width: '100%',
                    height: '200px',
                    backgroundImage: `url(${listing.photos[0]})`,
                    display: 'block',
                    backgroundPosition: '50% 50%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }}
                ></div>

                <Card.Body>{listing.title}</Card.Body>

                <Card.Footer>
                  <small className="text-muted">
                    Price:{' '}£
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
