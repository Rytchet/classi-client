import React from 'react';
import axios from 'axios';
import AppNavbar from '../components/AppNavbar';
import {
  Spinner,
  Image,
  Button,
  Jumbotron,
  ListGroup,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import { userService } from '../userService';

export class ListingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      listing: {},
      user: {},
      favorited: false,
      msg: '',
    };
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleUnfavorite = this.handleUnfavorite.bind(this);
  }

  componentDidMount() {
    // This code is retarded, i know, maybe I'll fix it later
    // It has to get the whole user to check if this listing is favorited
    axios.get('/listings/' + this.props.match.params.id).then(res => {
      this.setState({
        listing: res.data,
        user: JSON.parse(localStorage.getItem('user')),
        isLoaded: true,
      });

      if (this.state.user) {
        axios.get('/users/' + this.state.user.id).then(res => {
          const favorites = res.data.favorites;
          favorites.forEach(id => {
            if (id === this.props.match.params.id) {
              this.setState({
                favorited: true,
              });
            }
          });
        });
      }
    });
  }

  handleFavorite() {
    const listingId = this.state.listing._id;
    const token = this.state.user.token;

    userService.favorite(listingId, token).then(msg => {
      this.setState({ favorited: true });
    });
  }

  handleUnfavorite() {
    const listingId = this.state.listing._id;
    const token = this.state.user.token;

    userService.unfavorite(listingId, token).then(msg => {
      this.setState({ favorited: false });
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
      <div key={this.state.listing._id}>
        <AppNavbar user={this.state.user} />
        <div className="container mt-5">
          <center>
            <Image
              src={this.state.listing.photos[0]}
              rounded
              height="350"
              width="550"
            />
          </center>
          <br />
          <center>
            <div className="col-md-3 col-md-offset-3">
              <ListGroup horizontal>
                <ListGroup.Item>
                  <Image height="30px" width="30px" src="/carIcon.png" />
                  {this.state.listing.car.make || 'N\\A'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Image height="30px" width="30px" src="/engineIcon.png" />
                  {this.state.listing.car.mileage || 'N\\A'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Image height="30px" width="30px" src="/currencyIcon.png" />
                  {this.state.listing.price.toLocaleString(navigator.language, {
                    minimumFractionDigits: 2,
                  }) || 'N\\A'}
                </ListGroup.Item>
                {this.state.favorited && (
                  <ListGroup.Item>
                    <Image height="30" width="30" src="/star.svg"></Image>
                    Favourited
                  </ListGroup.Item>
                )}
              </ListGroup>
            </div>
          </center>
          <br />
          <Jumbotron style={{ whiteSpace: 'pre-wrap' }}>
            <h1>{this.state.listing.title || 'No title given.'}</h1>
            <h6>{this.state.listing.price || 'No price given.'}</h6>
            <p>
              {this.state.msg}
              {this.state.listing.description || 'No description given.'}
            </p>
            <p>
              <center>
                <DropdownButton
                  title="Contact Info"
                  variant="dark"
                  className="ml-3 left"
                  size="lg"
                >
                  <Dropdown.Item
                    eventKey="1"
                    href={'mailto:' + this.state.listing.email}
                  >
                    Email: {this.state.listing.email}
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="2">
                    Phone Number: {this.state.listing.phone || 'N/A'}
                  </Dropdown.Item>
                </DropdownButton>
              </center>
              {this.state.user && !this.state.favorited && (
                <Button
                  size="sm"
                  variant=""
                  className="float-right"
                  onClick={this.handleFavorite}
                >
                  <Image height="30" width="30" src="/star-outline.svg"></Image>
                </Button>
              )}
              {this.state.user && this.state.favorited && (
                <Button
                  size="sm"
                  variant=""
                  className="float-right"
                  onClick={this.handleUnfavorite}
                >
                  Unfavourite this listing
                  <Image height="30" width="30" src="/star.svg"></Image>
                </Button>
              )}
            </p>
          </Jumbotron>
        </div>
      </div>
    );
  }
}
