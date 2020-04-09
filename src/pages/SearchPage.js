import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar';
import Listings from '../components/Listings';
import queryString from 'query-string';

import axios from 'axios';

export class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      listings: [{ id: 'xd' }],
    };
  }

  componentDidMount() {
    let q = queryString.parse(this.props.location.search);
    axios.get('/listings/search', { params: { q } }).then(res => {
      this.setState(prevState => ({
        listings: [...res.data],
        user: JSON.parse(localStorage.getItem('user')),
      }));
    });
  }

  render() {
    let { user, listings } = this.state;

    return (
      <div>
        <AppNavbar user={user} />
        {listings.length > 0 && <Listings listings={listings} />}
        {listings.length == 0 && <h1>No listings found</h1>}
      </div>
    );
  }
}
