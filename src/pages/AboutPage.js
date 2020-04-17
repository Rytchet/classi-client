import React from 'react';
import AppNavbar from '../components/AppNavbar';
import { Jumbotron, Container, Button, Row, Col } from 'react-bootstrap';

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
          <Container style={{ paddingBottom: '140px' }}>
            <h1>Our Goal</h1>
            <p>
              The classic car community has been long overdue a fast and easy
              way to buy and sell their gorgeous vehicles. At Classi, we provide
              just that. Designed with car enthusiasts in mind, Classi makes it
              possible to buy and sell classic cars at the push of a button. Our
              exceptionally designed algorithms allow you to find the next
              addition to your collection within seconds! But don't take our
              word for it, sign-up today and connect with thousands of buyers
              and sellers from across the world. Buying and selling cars has
              never been easier. Stay Classi
            </p>
          </Container>

          <Container style={{ paddingBottom: '140px' }}>
            <h1>Meet the team</h1>
            <p>
              At Classi, we have an excellent team of developers dedicated to
              providing an excellent service to our clients. With a wide range
              of experience we provide a platform that is fast, reliable and
              secure so all our users have to do is enjoy a pleasant ride. Our
              developers have never lost sight of our goal and now it has never
              been a better time to own a classic car.
            </p>
          </Container>

          <Container style={{ paddingBottom: '140px' }}>
            <h1>Contact</h1>
            <Row>
              <Col>
                <Button href="mailto:classicars@classi.com">
                  Business: classicars@classi.com{' '}
                </Button>
              </Col>
              <Col>
                <Button href="mailto:classidevs@classi.com">
                  Technical: classidevs@classi.com{' '}
                </Button>{' '}
              </Col>
              <Col>
                <Button href="mailto:support@classi.com">
                  Customer Support: support@classi.com
                </Button>
              </Col>
            </Row>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}
