import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { userService } from '../userService';
import axios from 'axios';

export class EditListingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: '',
      user: JSON.parse(localStorage.getItem('user')),
      listing_id: this.props.match.params.id,
      images: '',
      title: '',
      description: '',
      price: '',
      make: '',
      model: '',
      year: '',
      mileage: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/listings/' + this.state.listing_id).then(res => {
      this.setState({
        title: res.data.title,
        price: res.data.price,
        description: res.data.description,
        make: res.data.car.make,
        model: res.data.car.model,
        year: res.data.car.year,
        mileage: res.data.car.mileage,
      });
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.setState({ loading: true });

    userService
      .updateListing(this.state)
      .then(res => {
        console.log('XDDD');
        this.props.history.push({
          pathname: '/listing/' + this.state.listing_id,
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  render() {
    const {
      title,
      description,
      price,
      mileage,
      make,
      model,
      year,
      loading,
      error,
    } = this.state;
    return (
      <div>
        <AppNavbar user={localStorage.getItem('user')} />
        <Container className="mt-5">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Title of your listing</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                placeholder="Title"
                name="title"
                value={title}
                onChange={this.handleChange}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Car make</Form.Label>
              <Form.Control
                type="text"
                placeholder="Make"
                name="make"
                value={make}
                onChange={this.handleChange}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Car model</Form.Label>
              <Form.Control
                type="text"
                placeholder="Model"
                name="model"
                value={model}
                onChange={this.handleChange}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="Year"
                name="year"
                value={year}
                onChange={this.handleChange}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Mileage</Form.Label>
              <Form.Control
                type="number"
                placeholder="Mileage"
                name="mileage"
                value={mileage}
                onChange={this.handleChange}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                name="price"
                value={price}
                onChange={this.handleChange}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                name="description"
                value={description}
                onChange={this.handleChange}
              ></Form.Control>
            </Form.Group>

            {error && (
              <Alert className="mt-3" variant="danger">
                {error}
              </Alert>
            )}

            <Button
              block
              disabled={loading}
              type="submit"
              className="mt-3 mb-5"
            >
              Edit the listing
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
