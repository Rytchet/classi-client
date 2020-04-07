import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import AppNavbar from './components/AppNavbar';

import { userService } from './userService';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    userService.logout();

    this.state = {
      email: '',
      password: '',
      submitted: false,
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

    this.setState({ submitted: true });
    const { email, password } = this.state;

    // Stop if form is invalid
    if (!(email && password)) {
      return;
    }

    this.setState({ loading: true });

    userService.login(email, password).then(
      (user) => {
        const { from } = this.props.location.state || {
          from: { pathname: '/' },
        };
        this.props.history.push(from);
      },
      (error) => {
        this.setState({ error, loading: false });
      }
    );
  }

  render() {
    const { email, password, submitted, loading, error } = this.state;
    return (
      <div>
        <AppNavbar />

        <div className="container mt-5">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlid="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button block disabled={loading} type="submit">
              Login
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
