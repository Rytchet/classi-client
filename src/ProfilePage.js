import React from 'react';
import AppNavbar from './components/AppNavbar';
import { Image, Jumbotron, Container } from 'react-bootstrap';
import axios from 'axios';

export default class ProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      isLoaded: false,
    };
  }

  componentDidMount() {
    const localUser = JSON.parse(localStorage.getItem('user'));
    axios
      .get('/users/' + localUser.id)
      .then(res => {
        console.log(res);
        this.setState({
          isLoaded: true,
          user: res.data,
          localUser,
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.isLoaded) {
      return <div>Page is loading</div>;
    }

    const { localUser, user } = this.state;

    return (
      <div bsPrefix=".bg-primary">
        <AppNavbar user={localUser} />
        <Jumbotron fluid>
          <Container>
            <center>
              <Image
                src={'https://classi-server.herokuapp.com' + user.avatar_url}
                height="400"
                width="400"
                alt="avatar"
                roundedCircle
              ></Image>
            </center>
            <br />
            <h1>{user.name}</h1>
            <h3>Favourites: {user.favourites}</h3>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
