import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar';
import Listings from '../components/Listings';
import queryString from 'query-string';

import { Form, Container, Button } from 'react-bootstrap';

import axios from 'axios';

export class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      listings: [{ id: 'xd' }],
      make: '',
      model: '',
      year: '',
      changer: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      let { make, model, year } = this.state;
      axios
        .get('/listings/search', {
          params: { 'car.make': make, 'car.model': model, 'car.year': year },
        })
        .then(res => {
          this.setState(prevState => ({
            listings: [...res.data],
            user: JSON.parse(localStorage.getItem('user')),
          }));
        });

      axios
        .get('/listings/search', {
          params: { 'car.make': make, 'car.model': model, 'car.year': year },
        })
        .then(res => {
          this.setState(prevState => ({
            listings: [...res.data],
            user: JSON.parse(localStorage.getItem('user')),
          }));
        });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  componentDidMount() {
    let q = queryString.parse(this.props.location.search).q;
    axios.get('/listings/search', { params: { q } }).then(res => {
      this.setState(prevState => ({
        listings: [...res.data],
        user: JSON.parse(localStorage.getItem('user')),
      }));
    });
  }

  render() {
    let { user, listings, make, model, year } = this.state;

    return (
      <div>
        <AppNavbar user={user} />
        <br />
        <center>
          <h1> Search...</h1>

          <Container>
            <Form onSubmit={this.handleSubmit} className="form-inline">
              <Form.Label className="m-2">Make</Form.Label>
              <Form.Control
                type="text"
                placeholder="Make"
                name="make"
                value={make}
                onChange={this.handleChange}
              ></Form.Control>

              <Form.Label className="m-2">Model</Form.Label>
              <Form.Control
                type="text"
                placeholder="Model"
                name="model"
                value={model}
                onChange={this.handleChange}
              ></Form.Control>

              <Form.Label className="m-2">Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="Year"
                name="year"
                value={year}
                onChange={this.handleChange}
              ></Form.Control>
            </Form>
          </Container>
        </center>

        {listings.length > 0 && <Listings listings={listings} />}
        {listings.length === 0 && <h1>No listings found</h1>}
      </div>
    );
  }
}
