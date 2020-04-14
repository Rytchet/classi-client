import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import AppNavbar from '../components/AppNavbar';

import { userService } from '../userService';

// A lot of the code is taken from here
// https://jasonwatmore.com/post/2018/09/11/react-basic-http-authentication-tutorial-example#login-page-jsx
// Dont sue me
// It has some nice error messages and shit, we can implement it maybe

export class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    userService.logout();

    this.state = {
      email: '',
      password: '',
      name: '',
      loading: false,
      error: '',
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

    const { email, password, name } = this.state;

    // Stop if form is invalid
    if (!(email && password && name)) {
      return;
    }

    this.setState({ loading: true });

    userService
      .register(name, email, password)
      .then(user => {
        const { from } = this.props.location.state || {
          from: { pathname: '/' },
        };
        this.props.history.push(from);
      })
      .catch(err => {
        this.setState({ error: err.response.data.msg });
      });
  }

  render() {
    const { name, email, password, loading, error } = this.state;
    return (
      <div>
        <AppNavbar />

        <div className="container mt-5">
          <center>
            <h1>Hello, please register your account!</h1>
          </center>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlid="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                name="name"
                value={name}
                placeholder="Your Name Here"
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlid="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Your Email Address"
                autoFocus
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Enter Password here"
                type="password"
                name="password"
                value={password}
                required
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button block disabled={loading} type="submit">
              Register
            </Button>
            {error && (
              <Alert className="mt-3" variant="danger">
                {error}
              </Alert>
            )}
          </Form>
        </div>
      </div>
    );
  }
}
