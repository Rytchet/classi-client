import React, { Component } from 'react';
import { Form, FormControl, Button, Nav, Navbar } from 'react-bootstrap';

class AppNavbar extends Component {
  render() {
    const user = this.props.user || false;

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
            <Nav>
              <Nav.Link href="/login">{user ? 'Logout' : 'Login'}</Nav.Link>
              {user && <Nav.Link href="/profile">Profile</Nav.Link>}
            </Nav>
            <Form inline className="ml-auto">
              <FormControl type="text" placeholder="Search" className="mr-2" />
              <br />
              <Button variant="outline-info" className="">
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
