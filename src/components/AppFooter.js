import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import './styles/AppFooter.css';

export default class AppFooter extends Component {
  render() {
    return (
      <div>
        <footer class="footer">
          <div class="container">
            <span class="text-white">
              <Row lg={true}>
                <Col>
                  <h4>Stuff</h4>
                  <ul className="list-unstyled">
                    <li>item 1</li>
                    <li>item 2</li>
                    <li>item 3</li>
                  </ul>
                </Col>
                <Col>
                  <h4>Stuff</h4>
                  <ul className="list-unstyled">
                    <li>item 1</li>
                    <li>item 2</li>
                    <li>item 3</li>
                  </ul>
                </Col>

                <Col>
                  <h4>Stuff</h4>
                  <ul className="list-unstyled">
                    <li>item 1</li>
                    <li>item 2</li>
                    <li>item 3</li>
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
