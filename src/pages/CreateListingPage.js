import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { userService } from '../userService';

export class CreateListingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      make: '',
      model: '',
      year: '',
      mileage: '',
      price: '',
      description: '',
      postcode: '',
      error: '',
      loading: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      title,
      make,
      model,
      year,
      mileage,
      price,
      description,
      postcode,
    } = this.state;

    this.setState({ loading: true });

    userService
      .createListing(
        title,
        make,
        model,
        year,
        mileage,
        price,
        description,
        postcode
      )
      .then(res => {
        console.log('xd');
        console.log(res);
        const { from } = this.props.location.state || {
          from: { pathname: '/listing/' + res.data._id },
        };
        this.props.history.push(from);
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  render() {
    const {
      title,
      make,
      model,
      year,
      mileage,
      price,
      description,
      postcode,
      error,
      loading,
    } = this.state;
    return (
      <div>
        <AppNavbar user={localStorage.getItem('user')} />
        <Container>
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

            <Form.Group>
              <Form.Label>Your postcode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Postcode"
                name="postcode"
                value={postcode}
                onChange={this.handleChange}
              ></Form.Control>
            </Form.Group>

            {error && (
              <Alert className="mt-3" variant="danger">
                {error}
              </Alert>
            )}

            <Button block disabled={loading} type="submit">
              Create the listing
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
