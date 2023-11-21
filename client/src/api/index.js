import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000/api/v1' });

export const registerUser = (regData) => API.post('/auth/registerUser', regData);
export const loginUser = (loginData) => API.post('/auth/loginUser', loginData);
export const getUsers = () => API.get('/users/getUsers');
export const getUserDetails = (id) => API.get(`/users/getUsers/${id}`);
export const updateUserProfile = (updateData) => API.patch(`/users/getUsers/${updateData.userId}`, updateData);
export const createBook = (bookData) => API.post('/book/createBook', bookData);
export const getBooks = () => API.get('/book/getBooks');

