import React from 'react';
import AppNavbar from '../components/AppNavbar';
import AppCarousel from '../components/AppCarousel';
import Listings from '../components/Listings';

export class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    this.setState({
      user: JSON.parse(localStorage.getItem('user')),
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <AppNavbar user={user} />
        <AppCarousel />
        <Listings />
      </div>
    );
  }
}
