import React from 'react';
import AppNavbar from '../components/AppNavbar';
import AppCarousel from '../components/AppCarousel';
import Listings from '../components/Listings';
import CardListings from '../components/CardListings';
import AdminPanel from '../components/AdminPanel';
import axios from 'axios';

export class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: JSON.parse(localStorage.getItem('user')),
      listings: [{ id: 'xd' }],
      mobile: false,
    };
  }

  componentDidMount() {
    axios.get('/listings').then(res => {
      this.setState(prevState => ({
        listings: [...res.data],
      }));
    });
  }

  resize() {
    this.setState({ mobile: window.innerWidth <= 760 });
  }

  render() {
    let { user, listings } = this.state;

    if (user) {
      if (user.email == 'admin@classi.com') {
        return (
          <div>
            <AppNavbar user={user} />
            <AdminPanel />
          </div>
        );
      }
    }

    return (
      <div>
        <AppNavbar user={user} />
        <AppCarousel />
        {window.innerWidth < 760 && (
          <CardListings listings={this.state.listings} />
        )}
        {window.innerWidth >= 760 && (
          <Listings listings={this.state.listings} />
        )}
      </div>
    );
  }
}
