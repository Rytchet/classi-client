import React, { Component } from 'react';
import { Container, Card, CardColumns, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'postboot/dist/css/postboot.min.css';

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
      <Container>
        <h1>Featured Listings</h1>

        {this.state.listings.map(listing => (
          <Link to={'/listing/' + listing._id} key={listing._id}>
            <div class="card flex-sm-row mb-gutter">
              <img
                style={{ width: 'auto', height: '20vh' }}
                className="card-img-sm-left"
                src={listing.photos[0]}
              />
              <div class="card-body">
                <h4 class="card-title">{listing.title}</h4>
                <p class="card-text">
                  {listing.car.year} {listing.car.make} {listing.car.model}
                </p>
              </div>
              <hr />
              <b className="card-footer">
                <p>
                  £
                  {listing.price.toLocaleString(navigator.language, {
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p className="float-right">
                  <img height="20px" src="/eye-outline.svg"></img>{' '}
                  {listing.times_viewed}
                </p>
              </b>
            </div>
          </Link>
        ))}

        {/* nMight want to save these and put them into a different file for favourites.
        
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
        </CardColumns>*/}
      </Container>
    );
  }
}

export default Listings;
