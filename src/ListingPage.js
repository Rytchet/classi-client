import React from 'react';
import axios from 'axios';
import AppNavbar from './components/AppNavbar';
import { Spinner, Image, Button, Jumbotron, ListGroup } from 'react-bootstrap';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      listing: {},
      user: {},
    };
  }

  componentDidMount() {
    axios.get('/listings/' + this.props.match.params.id).then(res => {
      this.setState({
        listing: res.data,
        user: JSON.parse(localStorage.getItem('user')),
        isLoaded: true,
      });
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
        <AppNavbar />
        <div className="container mt-5">
          <center>
            <Image src="/testcar.png" rounded height="350" width="550" />
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
                  {this.state.listing.price || 'N\\A'}
                </ListGroup.Item>
              </ListGroup>
            </div>
          </center>
          <br />
          <Jumbotron>
            <h1>{this.state.listing.title || 'No title given.'}</h1>
            <h6>{this.state.listing.price || 'No price given.'}</h6>
            <p>{this.state.listing.description || 'No description given.'}</p>
            <p>
              <Button variant="primary">Contact</Button>
            </p>
          </Jumbotron>
        </div>
      </div>
    );
  }
}
