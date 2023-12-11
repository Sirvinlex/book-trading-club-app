import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000/api/v1' });

export const registerUser = (regData) => API.post('/auth/registerUser', regData);
export const loginUser = (loginData) => API.post('/auth/loginUser', loginData);
export const getUsers = () => API.get('/users/getUsers');
export const getUserDetails = (id) => API.get(`/users/getUsers/${id}`);
export const updateUserProfile = (updateData) => API.patch(`/users/updateUserProfile/${updateData.userId}`, updateData);
export const updateBookProps = (updateData) => API.patch(`/book/updateBookProps`, updateData);
export const updateUserBookCount = (updateData) => API.patch(`/users/updateUserBookCount`, updateData);
export const updateUserRequestCount = (updateData) => API.patch(`/users/updateUserRequestCount`, updateData);
export const updateUserTradeCount = (updateData) => API.patch(`/users/updateUserTradeCount`, updateData);
export const createBook = (bookData) => API.post('/book/createBook', bookData);
export const request = (requestData) => API.post('request/create-request', requestData);
export const getRequestData = () => API.get('/request/getRequestData');
export const updateRequestData = (updateData) => API.patch(`/request/updateRequestData`, updateData);
export const deleteRequestData = (dataId) => API.delete(`/request/deleteRequestData/${dataId}`);
export const getBooks = () => API.get('/book/getBooks');
export const deleteBook = (bookId) => API.delete(`/book/deleteBook/${bookId}`);
export const getUserBooks = (userId) => API.get(`/book/getUserBooks/${userId}`);
export const createTrade = (tradeData) => API.post('/trades/createTrade', tradeData);
export const getTrades = () => API.get('/trades/getTrades');




