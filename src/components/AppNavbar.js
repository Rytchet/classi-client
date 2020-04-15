import React, { Component } from 'react';
import { Form, FormControl, Button, Nav, Navbar } from 'react-bootstrap';
import './styles/AppNavbar.css';
import { withRouter } from 'react-router-dom';
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
        <Navbar className="color-nav" bg="dark" expand="sm">
          <Navbar.Brand style={{ color: 'white' }} href="/">
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
              <Nav.Link style={{ color: 'white' }} href="/">
                Home
              </Nav.Link>
              {user && (
                <Nav.Link style={{ color: 'white' }} href="/profile#Favourites">
                  Favourites
                </Nav.Link>
              )}

              <Nav.Link style={{ color: 'white' }} href="/About">
                About Us
              </Nav.Link>

              {!user && (
                <Nav.Link style={{ color: 'white' }} href="/register">
                  Register
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              {user && (
                <Nav.Link style={{ color: 'white' }} href="/createListing">
                  Create your own listing
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              {user && (
                <Nav.Link style={{ color: 'white' }} href="/profile">
                  Profile
                </Nav.Link>
              )}
              <Nav.Link style={{ color: 'white' }} href="/login">
                {user ? 'Logout' : 'Login'}
              </Nav.Link>
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
      </div>
    );
  }
}

export default AppNavbar;
