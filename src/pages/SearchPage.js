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
      pricegt: '',
      pricelt: '',
      yeargt: '',
      yearlt: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      let { make, model, year, yearlt, yeargt, pricegt, pricelt } = this.state;
      axios
        .put('/listings/search', {
          'car.make': make,
          'car.model': model,
          'car.year': year,
          'car.year': { $lt: yearlt, $gt: yeargt },
          price: { $lt: pricelt, $gt: pricegt },
        })
        .then(res => {
          this.setState(prevState => ({
            listings: [...res.data],
            user: JSON.parse(localStorage.getItem('user')),
          }));
        });

      axios
        .put('/listings/search', {
          'car.make': make,
          'car.model': model,
          'car.year': year,
          'car.year': { $lt: yearlt, $gt: yeargt },
          price: { $lt: pricelt, $gt: pricegt },
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
    axios.put('/listings/search', { q }).then(res => {
      this.setState(prevState => ({
        listings: [...res.data],
        user: JSON.parse(localStorage.getItem('user')),
      }));
    });
  }

  render() {
    let {
      user,
      listings,
      make,
      model,
      year,
      yearlt,
      yeargt,
      pricelt,
      pricegt,
    } = this.state;

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

              <Form.Label className="m-2">Price less than</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                name="pricelt"
                value={pricelt}
                onChange={this.handleChange}
              ></Form.Control>

              <Form.Label className="m-2">Price greater than</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                name="pricegt"
                value={pricegt}
                onChange={this.handleChange}
              ></Form.Control>

              <Form.Label className="m-2">Year greater than</Form.Label>
              <Form.Control
                type="number"
                placeholder="Year"
                name="yeargt"
                value={yeargt}
                onChange={this.handleChange}
              ></Form.Control>

              <Form.Label className="m-2">Year less than</Form.Label>
              <Form.Control
                type="number"
                placeholder="Year"
                name="yearlt"
                value={yearlt}
                onChange={this.handleChange}
              ></Form.Control>
            </Form>
          </Container>
        </center>

        {listings.length > 0 && <Listings listings={listings} />}
        {listings.length === 0 && (
          <center>
            <h1>No listings found</h1>
          </center>
        )}
      </div>
    );
  }
}
