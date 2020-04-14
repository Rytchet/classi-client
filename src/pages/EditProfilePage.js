import React, { Component } from 'react';
import AppNavbar from '../components/AppNavbar';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { userService } from '../userService';
import FormData from 'form-data';

export class EditProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: '',
      user: JSON.parse(localStorage.getItem('user')),
      name: JSON.parse(localStorage.getItem('user')).name,
      images: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImages = this.handleImages.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleImages(e) {
    const files = Array.from(e.target.files);
    this.setState({
      images: files,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { images, user } = this.state;

    this.setState({ loading: true });

    // Get all the images
    let formData = new FormData();
    let avatarExists = false;
    if (images) {
      images.forEach(image => {
        avatarExists = true;
        formData.append('avatar', image);
      });
    }

    await userService
      .updateUser(this.state.name)
      .then(res => {
        let user = JSON.parse(localStorage.getItem('user'));
        user.name = res.data.name;
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch(err => console.log(err));

    if (!avatarExists) {
      this.props.history.push({ pathname: '/profile/' });
    }

    if (avatarExists) {
      userService
        .uploadProfilePicture(formData)
        .then(res => {
          const { from } = this.props.location.state || {
            from: { pathname: '/profile/' },
          };
          this.props.history.push(from);
        })
        .catch(err => {
          console.log(err);
          // this.setState({ error: err.response.data.msg });
          this.setState({ loading: false });
        });
    }
  }

  render() {
    const { name, loading, error } = this.state;
    return (
      <div>
        <AppNavbar user={localStorage.getItem('user')} />
        <Container className="mt-5">
          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                autoFocus
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={this.handleChange}
                required
              ></Form.Control>
            </Form.Group>

            <Form.File
              label="Profile picture"
              id="photos"
              name="photos"
              onChange={this.handleImages}
            />

            {error && (
              <Alert className="mt-3" variant="danger">
                {error}
              </Alert>
            )}

            <Button
              block
              disabled={loading}
              type="submit"
              className="mt-3 mb-5"
            >
              Create the listing
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
