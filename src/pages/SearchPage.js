import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar';
import Listings from '../components/Listings';
import queryString from 'query-string';

import { Form, Container, Col, Row, Jumbotron } from 'react-bootstrap';

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
      decade: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      let {
        make,
        model,
        year,
        yearlt,
        yeargt,
        pricegt,
        pricelt,
        decade,
      } = this.state;

      if (decade) {
        yearlt = parseInt(decade) + 9;
        yeargt = parseInt(decade);
      }

      console.log(decade);
      console.log(yearlt);
      console.log(yeargt);

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
      decade,
    } = this.state;

    return (
      <div>
        <AppNavbar user={user} />
        <br />
        <center>
          <h1> Search...</h1>
        </center>
        <Container>
          <center>
            <Jumbotron>
              <Form onSubmit={this.handleSubmit} className="form-inline">
                <div>
                  <Row lg={true}>
                    <Col>
                      <Form.Label className="m-2">Make</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Make"
                        name="make"
                        value={make}
                        onChange={this.handleChange}
                      ></Form.Control>
                    </Col>

                    <Col>
                      <Form.Label className="m-2">Model</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Model"
                        name="model"
                        value={model}
                        onChange={this.handleChange}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label className="m-2">Year</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Year"
                        name="year"
                        value={year}
                        onChange={this.handleChange}
                      ></Form.Control>
                    </Col>
                    <Col>
                      <Form.Label className="m-2">Decade</Form.Label>
                      <Form.Control
                        as="select"
                        onChange={this.handleChange}
                        name="decade"
                        value={decade}
                      >
                        <option default value="">
                          Decade
                        </option>
                        <option value={1910}>1910's</option>
                        <option value={1920}>1920's</option>
                        <option value={1930}>1930's</option>
                        <option value={1940}>1940's</option>
                        <option value={1950}>1950's</option>
                        <option value={1960}>1960's</option>
                        <option value={1970}>1970's</option>
                        <option value={1980}>1980's</option>
                        <option value={1990}>1990's</option>
                      </Form.Control>
                    </Col>
                  </Row>
                </div>
                {/* Highest Price/Year settings row */}
                <Row lg={true}>
                  <Col>
                    <Form.Label className="m-2">Highest Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Price"
                      name="pricelt"
                      value={pricelt}
                      onChange={this.handleChange}
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Form.Label className="m-2">Lowest Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Price"
                      name="pricegt"
                      value={pricegt}
                      onChange={this.handleChange}
                    ></Form.Control>
                  </Col>

                  <Col>
                    <Form.Label className="m-2">As old as</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Year (1960)"
                      name="yeargt"
                      value={yeargt}
                      onChange={this.handleChange}
                    ></Form.Control>
                  </Col>
                  <Col>
                    <Form.Label className="m-2">As new as</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Year (2020)"
                      name="yearlt"
                      value={yearlt}
                      onChange={this.handleChange}
                    ></Form.Control>
                  </Col>
                </Row>
              </Form>
            </Jumbotron>
          </center>
        </Container>

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
