import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

export default function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    axios
      .post('/auth', {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
      })
      .catch((e) => {
        console.log(e);
        setError('Login failed.');
      });
  }

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlid="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block disabled={!validateForm()} type="submit">
          Login
        </Button>
        {error && (
          <Alert className="mt-3" variant="danger">
            {error}
          </Alert>
        )}
      </Form>
    </div>
  );
}
