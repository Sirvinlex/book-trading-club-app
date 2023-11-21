import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/authSlice';
import usersSlice from './features/usersSlice';
import bookSlice from './features/bookSlice';

export const store = configureStore({
    reducer:{
        auth: authSlice,
        users: usersSlice,
        book: bookSlice,
    }
});