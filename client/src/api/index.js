import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000/api/v1' });

export const registerUser = (regData) => API.post('/auth/registerUser', regData);
export const loginUser = (loginData) => API.post('/auth/loginUser', loginData);