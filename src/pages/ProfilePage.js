import React from 'react';
import AppNavbar from '../components/AppNavbar';
import { Image, Jumbotron, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import Listings from '../components/Listings';

export class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      isLoaded: false,
      favorites: [],
      recommended: [],
    };
  }

  async componentDidMount() {
    const localUser = JSON.parse(localStorage.getItem('user'));
    await axios
      .get('/users/' + localUser.id)
      .then(res => {
        console.log(res.data);
        this.setState({
          isLoaded: true,
          user: res.data,
          localUser,
        });
      })
      .catch(err => console.log(err));

    if (!this.state.user.favorites) return;

    this.state.user.favorites.forEach(
      async function (id) {
        await axios
          .get('/listings/' + id)
          .then(res => {
            this.setState({
              favorites: [...this.state.favorites, res.data],
            });
          })
          .catch(err => console.log(err));
      }.bind(this)
    );

    console.log('xd');
    await axios
      .get('/listings/recommended/' + this.state.user._id)
      .then(res => {
        console.log('xd');
        this.setState({
          recommended: res.data,
        });
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Page is loading</div>;
    }

    const { localUser, user } = this.state;

    return (
      <div>
        <AppNavbar user={localUser} />
        <Jumbotron fluid>
          <Container>
            <center>
              <Image
                src={user.avatar_url}
                height="250"
                width="250"
                alt="avatar"
                roundedCircle
              ></Image>
            </center>
            <br />
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            {this.state.favorites.length > 0 && <h3>Your favourites:</h3>}
            <Listings listings={this.state.favorites} />

            <h3>Recommended for you</h3>
            <Listings listings={this.state.recommended} />
           
            <center>
              <p>
                <Button variant="primary" href="/createListing">
                  Create Listing
                </Button>{' '}
                <Button variant="primary">Edit Profile</Button>
              </p>
            </center>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
