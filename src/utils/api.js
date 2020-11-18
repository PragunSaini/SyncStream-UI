import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://syncstream.southeastasia.cloudapp.azure.com'
    : 'http://localhost:8000';
// ? 'http://192.168.1.10:8000'

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

// Room create/join
export const createRoom = async () => {
  return axios.post(`${API_URL}/room`, {}, { headers: getHeaders() });
};

export const joinRoom = async roomid => {
  return axios.post(
    `${API_URL}/room/join`,
    { roomid },
    {
      headers: getHeaders(),
    }
  );
};
