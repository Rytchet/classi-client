import axios from 'axios';

export const userService = {
  login,
  logout,
  register,
  favorite,
  unfavorite,
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
