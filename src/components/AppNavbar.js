import React, { Component } from 'react';
import { Form, FormControl, Button, Nav, Navbar } from 'react-bootstrap';

class AppNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      q: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const user = this.props.user || false;
    const { q } = this.props;

    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="sm">
          <Navbar.Brand href="/">
            <img
              alt=""
              src="/classi.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Classi
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/login">{user ? 'Logout' : 'Login'}</Nav.Link>
              {!user && <Nav.Link href="/register">Register</Nav.Link>}
              {user && <Nav.Link href="/profile">Profile</Nav.Link>}
            </Nav>
            <Nav>
              {user && (
                <Nav.Link href="/createListing">Add your own listing</Nav.Link>
              )}
            </Nav>
            <Form inline action="/search">
              <FormControl
                type="text"
                name="q"
                value={q}
                onChange={this.handleChange}
                placeholder="Search"
                className="mr-2"
              />
              <br />
              <Button variant="outline-info" className="" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <br />
        {/* <Nav justify dark="true" variant="tabs">
          <Nav.Item>
            <Nav.Link href="/classical-cars">Classical Cars</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/">Trending</Nav.Link>
          </Nav.Item>
        </Nav> */}
      </div>
    );
  }
}

export default AppNavbar;
