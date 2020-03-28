import React, { Component } from "react";
import logo from "../classi.png";
import "./AppNavbar.css";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Classi</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#featured">Featured</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
        <br />
        <Nav justify dark variant="tabs">
          <Nav.Item>
            <Nav.Link href="/classical-cars">Classical Cars</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/" eventKey="link-1">
              Trending
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <br />
      </div>
    );
  }
}

export default AppNavbar;
