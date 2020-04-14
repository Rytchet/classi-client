import React from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import AppNavbar from '../components/AppNavbar';
import CardListings from '../components/CardListings';
import 'react-image-gallery/styles/css/image-gallery.css';
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
      images: [],
      recommended: [],
    };
    this.handleFavorite = this.handleFavorite.bind(this);
    this.handleUnfavorite = this.handleUnfavorite.bind(this);
  }

  async componentDidMount() {
    await this.setState({
      user: JSON.parse(localStorage.getItem('user')),
    });

    let url = '';
    if (this.state.user) {
      url =
        '/listings/' + this.props.match.params.id + '/' + this.state.user.id;
    } else {
      url = '/listings/' + this.props.match.params.id;
    }

    axios
      .get('/listings/recommended/' + this.state.user.id)
      .then(res => {
        this.setState({
          recommended: res.data,
        });
      })
      .catch(err => {
        console.log(err);
      });

    // This code is retarded, i know, maybe I'll fix it later
    // It has to get the whole user to check if this listing is favorited
    axios.get(url).then(res => {
      this.setState({
        listing: res.data,
        isLoaded: true,
      });

      let images = [];
      this.state.listing.photos.forEach(url => {
        images.push({ original: url, thumbnail: url });
      });
      this.setState({ images });

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
            <ImageGallery items={this.state.images} />
          </center>
          <br />
          {/* Here is the Card image this code is getting extremely long so I'm commenting sections */}
          <center>
            <div className="col-md-3 col-md-offset-3">
              <ListGroup horizontal>
                <ListGroup.Item>
                  <Image height="30px" width="30px" src="/carIcon.png" />
                  {this.state.listing.car.make || 'N\\A'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Image height="30px" width="30px" src="/mileageIcon.png" />
                  {this.state.listing.car.mileage.toLocaleString(
                    navigator.language,
                    {
                      minimumFractionDigits: 0,
                    }
                  ) || 'N\\A'}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Image height="30px" width="30px" src="/currencyIcon.png" />
                  {this.state.listing.price.toLocaleString(navigator.language, {
                    minimumFractionDigits: 0,
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
            <h6>
              £
              {this.state.listing.price.toLocaleString(navigator.language, {
                minimumFractionDigits: 0,
              }) || 'No price given.'}
            </h6>
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
          {this.state.recommended && (
            <div>
              <h3>Recommended for you</h3>
              <CardListings listings={this.state.recommended} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
