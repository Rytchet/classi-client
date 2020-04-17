import React, { Component } from 'react';
import { Form, FormControl, Button, Nav, Navbar } from 'react-bootstrap';
import './styles/AppNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        <Navbar
          className="color-nav"
          backgroundColor="rgb(0,88,130)"
          expand="sm"
        >
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
            </Nav>
            <Nav></Nav>
            <Nav>
              {user && (
                <Nav.Link style={{ color: 'white' }} href="/profile">
                  <img
                    src="/person-outline.svg"
                    height="30px"
                    width="30px"
                  ></img>
                </Nav.Link>
              )}
              {!user && (
                <Nav.Link style={{ color: 'white' }} href="/register">
                  Register
                </Nav.Link>
              )}
              <Nav.Link style={{ color: 'white' }} href="/login">
                {user ? (
                  <img
                    src="/log-out-outline.svg"
                    height="30px"
                    width="30px"
                  ></img>
                ) : (
                  <img
                    src="/log-in-outline.svg"
                    height="30px"
                    width="30px"
                  ></img>
                )}
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
                style={{ marginBottom: '10px', marginTop: '10px' }}
              />
            </Form>
            {user && (
              <Button variant="danger" type="submit" href="/createListing">
                Create a listing
              </Button>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
