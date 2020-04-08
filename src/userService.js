import axios from 'axios';

export const userService = {
  login,
  logout,
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
