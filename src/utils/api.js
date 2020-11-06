import axios from 'axios';

// const API_URL = 'http://localhost:8000'; // for dev
const API_URL = 'https://syncstream.southeastasia.cloudapp.azure.com'; // for prod

const getHeaders = () => {
  const userData = JSON.parse(window.localStorage.getItem('user')) || null;
  return {
    Authorization: userData ? 'bearer ' + userData.token : '',
  };
};

// Login/Register
export const login = async data => {
  return axios.post(`${API_URL}/login`, data);
};

export const register = async data => {
  return axios.post(`${API_URL}/register`, data);
};

export const refresh = async () => {
  return axios.get(`${API_URL}/login/refresh`, { headers: getHeaders() });
};
