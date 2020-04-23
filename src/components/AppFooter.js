import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Router, Link } from 'react-router-dom';
import './styles/AppFooter.css';

export default class AppFooter extends Component {
  render() {
    return (
      <div>
        <footer class="footer">
          <div class="container">
            <span class="text-light">
              <Row lg={true}>
                <Col>
                  <h4>Quick Links</h4>
                  <ul className="list-unstyled text-light">
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>
                      <a href="/About">About Us</a>
                    </li>
                    <li>
                      <a href="/search?q=">Search</a>
                    </li>
                  </ul>
                </Col>
                <Col>
                  <h4>Contact us</h4>
                  <ul className="list-unstyled">
                    <li>
                      <a href="mailto:admin@classi.com">Administrator</a>
                    </li>
                    <li>
                      <a href="mailto:classidevs@classi.com">Technical</a>
                    </li>
                    <li>
                      <a href="mailto:support@classi.com">Customer Support</a>
                    </li>
                  </ul>
                </Col>

                <Col>
                  <h4>Legal</h4>
                  <ul className="list-unstyled">
                    <li>Terms of Service</li>
                    <li>Privacy</li>
                    <li>Copyright</li>
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col sm={true}>
                  <p>
                    &copy;{new Date().getFullYear()} Classi Automobiles Limited
                    | All rights reserved | Terms of Service | Privacy
                  </p>
                </Col>
              </Row>
            </span>
          </div>
        </footer>
      </div>
    );
  }
}
