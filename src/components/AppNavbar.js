import React, { Component } from 'react';
import { Form, FormControl, Button, Nav, Navbar } from 'react-bootstrap';

class AppNavbar extends Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="md">
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
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#featured">Featured</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-2" />
              <Button variant="outline-info" className="">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
       
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
