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
          <Container style={{paddingBottom: '140px'}}>
            <h1>Our Goal</h1>
            <p>this is a generic ambitious goal that inspires people</p>
          </Container>
   
          <Container style={{paddingBottom: '140px'}}>
            <h1>Meet the team</h1>
            <p>heres the team: generic image of the team or description</p>
          </Container>

          <Container style={{paddingBottom: '140px'}}>
            <h1>other title</h1>
            <p>
              This is some more generic information about our website and team.
            </p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
