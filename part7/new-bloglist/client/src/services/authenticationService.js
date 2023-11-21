import axios from 'axios';
const baseUrl = '/api/auth';

const login = (credentials) => {
  const response = axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

const logout = (credentials) => {
  const response = axios.post(`${baseUrl}/logout`, credentials);
  return response.data;
};

export { login, logout };
