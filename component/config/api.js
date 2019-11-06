import axios from 'axios';

//create custom instance axios
export const API = axios.create({
  baseURL: 'http://192.168.1.22:5000/api/v2',
});

// Alter defaults after instance has been created
export const setHeaderAuth = token => {
  API.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};
