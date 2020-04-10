import axios from 'axios';

export const userService = {
  login,
  logout,
  register,
  favorite,
  unfavorite,
  createListing,
};

function login(email, password) {
  return axios
    .post('/auth', {
      email,
      password,
    })
    .then(res => {
      let user = res.data.user;
      user.token = res.data.token;

      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
}

function logout() {
  localStorage.removeItem('user');
}

function register(name, email, password) {
  return axios
    .post('/users', {
      name,
      email,
      password,
    })
    .then(res => {
      let user = res.data.user;
      user.token = res.data.token;
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    });
}

function favorite(listingId, token) {
  return axios({
    method: 'put',
    url: '/users/favorites/' + listingId,
    headers: { 'x-auth-token': token },
  }).then(res => {
    return res;
  });
}

function unfavorite(listingId, token) {
  return axios({
    method: 'delete',
    url: '/users/favorites/' + listingId,
    headers: { 'x-auth-token': token },
  }).then(res => {
    return res;
  });
}

async function createListing(state, formData) {
  // Get the token for auth
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.token;

  // All of the variables from state
  const {
    title,
    make,
    model,
    year,
    mileage,
    price,
    description,
    postcode,
  } = state;

  // Send the request
  return axios({
    method: 'post',
    url: '/listings',
    headers: { 'x-auth-token': token },
    data: {
      title,
      car: {
        make,
        model,
        year,
        mileage,
      },
      price,
      description,
      location: {
        postcode,
      },
    },
  }).then(async listing_res => {
    // If there is no photos, don't send the 2nd request
    if (!formData.has('photos')) {
      return listing_res;
    }
    // Send the 2nd request
    const id = listing_res.data._id;
    await axios.post('/images/listings/' + id, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': token,
      },
    });
    return listing_res;
  });
}
