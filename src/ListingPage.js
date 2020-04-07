import React from 'react';
import axios from 'axios';
import AppNavbar from './components/AppNavbar';
import { Spinner } from 'react-bootstrap';

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
    axios.get('/listings/' + this.props.match.params.id).then((res) => {
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
      <div>
        <AppNavbar />
        <div className="container mt-5">
          <p>{this.state.listing._id}</p>
          <p>{this.state.listing.title}</p>
        </div>
      </div>
    );
  }
}
