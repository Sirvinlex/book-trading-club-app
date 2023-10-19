import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as api from '../api';

const initialState = {
    name: '',
    email: '',
    password: '',
    // login: true,
    user: {},
    toggleUser: false,
    loading: false,
};

export const regUser = createAsyncThunk('register/user', async (regData, thunkAPI) =>{
    try {
        const {data} = await api.registerUser(regData);
        return data.message
    } catch (error) {
        return  thunkAPI.rejectWithValue(error.response.data.message);
    }

});

export const logUser = createAsyncThunk('login/user', async (loginData, thunkAPI) =>{
    try {
        const {data} = await api.loginUser(loginData);
        console.log(data, 'login')
        return data.result
    } catch (error) {
        console.log(error)
        
        return  thunkAPI.rejectWithValue(error.response.data.message);
    }
});

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        handleInputs: (state, {payload: {name, value}}) =>{
            console.log(name, value)
            state[name] = value;
        },
    },
    extraReducers:{
        [regUser.pending]: (state, actions) => {
            
        },
        [regUser.fulfilled]: (state, actions) => {
            
        },
        [regUser.rejected]: (state, actions) => {
        },
        [logUser.pending]: (state, actions) => {
        },
        [logUser.fulfilled]: (state, {payload}) => {
            
        },
        [logUser.rejected]: (state, actions) => {
            
        },
    }
});

export const { handleInputs, } = userSlice.actions;

export default userSlice.reducer;