import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class AdminPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
      user: JSON.parse(localStorage.getItem('user')),
      count: 0,
    };

    this.handleApprove = this.handleApprove.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  async componentDidMount() {
    await axios.get('/listings').then(listings => {
      listings.data.forEach(listing => {
        if (listing.reported) {
          this.setState((prev, props) => ({
            listings: [listing, ...prev.listings],
            count: prev.count + 1,
          }));
        }
      });
    });
  }

  handleApprove(e, id) {
    e.preventDefault();
    console.log(this.state.user);
    axios.put(
      '/listings/approve/' + id,
      {},
      {
        headers: {
          'x-auth-token': this.state.user.token,
        },
      }
    );
    this.setState(prev => ({
      count: prev.count - 1,
    }));
    document.getElementById(id).style = 'display: none';
  }

  handleDelete(e, id) {
    e.preventDefault();
    console.log(this.state.user);
    axios.delete('/listings/' + id, {
      headers: {
        'x-auth-token': this.state.user.token,
      },
    });
    this.setState(prev => ({
      count: prev.count - 1,
    }));
    document.getElementById(id).style = 'display: none';
  }

  render() {
    if (this.state.count == 0) {
      return (
        <center>
          <h1 className="mt-5">There is no reported listings</h1>
        </center>
      );
    }

    return (
      <Container className="mt-5">
        {this.state.listings.map(listing => (
          <Link
            to={'/listing/' + listing._id}
            key={listing._id}
            id={listing._id}
          >
            <div class="container py-2">
              <div class="card flex-row">
                <img
                  style={{
                    overflow: 'hidden',
                    width: '25%',
                    height: '100%',
                    backgroundImage: `url(${listing.photos[0]})`,
                    display: 'block',
                    backgroundPosition: '50% 50%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }}
                  class="fluid-image rounded-left"
                  src={listing.photos[0]}
                  alt="Card image cap"
                />
                <div class="d-flex flex-column flex-grow-1">
                  <div class="card-body w-40">
                    <h5 class="card-title">{listing.title}</h5>
                    <h3 class="card-text">
                      {listing.car.year} {listing.car.make} {listing.car.model}
                    </h3>
                    <hr />
                    <b class=".bg-light-gray">
                      £
                      {listing.price.toLocaleString(navigator.language, {
                        minimumFractionDigits: 2,
                      })}
                      <p className="float-right">
                        <Button
                          className="ml-auto mr-2"
                          variant="success"
                          onClick={e => this.handleApprove(e, listing._id)}
                        >
                          Approve
                        </Button>
                        <Button
                          className="ml-auto mr-2"
                          variant="danger"
                          onClick={e => this.handleDelete(e, listing._id)}
                        >
                          Delete
                        </Button>
                        <img height="20px" src="/eye-outline.svg"></img> Times
                        Viewed: {listing.times_viewed}
                      </p>
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Container>
    );
  }
}
