import React from 'react';
import AppNavbar from '../components/AppNavbar';
import { Jumbotron, Container } from 'react-bootstrap';

export class AboutPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.setState(prevState => ({
      user: JSON.parse(localStorage.getItem('user')),
    }));
  }

  render() {
    let { user } = this.state;
    return (
      <div>
        <AppNavbar user={user} />
        <Jumbotron fluid>
          <Container>
            <h1>Our Goal</h1>
            <p>
              Our goal is to get a good fucking grade on this project and a
              chonky nice portfolio piece
            </p>
          </Container>
        </Jumbotron>
        <Jumbotron fluid>
          <Container>
            <h1>Meet the team</h1>
            <p>heres the team: generic image of the team or description</p>
          </Container>
        </Jumbotron>
        <Jumbotron fluid>
          <Container>
            <h1>Something else</h1>
            <p>This is some generic information about our website and team.</p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
