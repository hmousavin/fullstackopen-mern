import axios from 'axios';
const baseUrl = '/api/user';

const login = (credentials) => {
  const response = axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

const logout = (credentials) => {
  const response = axios.post(`${baseUrl}/logout`, credentials);
  return response.data;
};

const isLoggedIn = (credentials) => {
  const response = axios.get(`${baseUrl}/isLoggedIn`, credentials);
  return response.data.isLoggedIn;
};

export default { login, logout, isLoggedIn };
