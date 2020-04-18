import React from 'react';
import AppNavbar from '../components/AppNavbar';
import AppCarousel from '../components/AppCarousel';
import Listings from '../components/Listings';
import AdminPanel from '../components/AdminPanel';
import axios from 'axios';

export class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      listings: [{ id: 'xd' }],
    };
  }

  componentDidMount() {
    axios.get('/listings').then(res => {
      this.setState(prevState => ({
        listings: [...res.data],
        user: JSON.parse(localStorage.getItem('user')),
      }));
    });
  }

  render() {
    let { user, listings } = this.state;

    if (user.email == 'admin@classi.com') {
      return (
        <div>
          <AppNavbar user={user} />
          <AdminPanel />
        </div>
      );
    }

    return (
      <div>
        <AppNavbar user={user} />
        <AppCarousel />
        <Listings listings={listings} />
      </div>
    );
  }
}
