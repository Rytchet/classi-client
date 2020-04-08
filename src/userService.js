import axios from 'axios';

export const userService = {
  login,
  logout,
  register,
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
