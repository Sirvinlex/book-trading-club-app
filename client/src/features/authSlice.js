import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import * as api from '../api';

const initialState = {
    name: '',
    email: '',
    password: '',
    // authSuccess: false,
    user: {},
    toggleUser: false,
    loading: false,
    deactivateBtn: false,
};

export const regUser = createAsyncThunk('register/user', async (regData, thunkAPI) =>{
    try {
        const {data} = await api.registerUser(regData);
        // console.log(data)
        return data;
    } catch (error) {
        return  thunkAPI.rejectWithValue(error.response.data.msg);
    }

});

export const logUser = createAsyncThunk('login/user', async (loginData, thunkAPI) =>{
    try {
        const {data} = await api.loginUser(loginData);
        // console.log(data, 'login')
        return data;
    } catch (error) {
        console.log(error)
        
        return  thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        handleInputs: (state, {payload: {name, value}}) =>{
            state[name] = value;
        },
        resetUserState: (state) =>{
            state.user = {};
        },
    },
    extraReducers:{
        [regUser.pending]: (state, actions) => {
            state.deactivateBtn = true;
        },
        [regUser.fulfilled]: (state, actions) => {
            state.user = actions.payload;
            // console.log(actions.payload, 'action payload')
            localStorage.setItem('user', JSON.stringify(state.user));
            // console.log(state.user)
            alert(state.user.msg);
            state.name = '';
            state.email = '';
            state.password = '';
            state.deactivateBtn = false;
            // state.authSuccess = true;
        },
        [regUser.rejected]: (state, actions) => {
            // console.log(actions.payload);
            alert(actions.payload);
            state.deactivateBtn = false;
        },
        [logUser.pending]: (state, actions) => {
            state.deactivateBtn = true;
        },
        [logUser.fulfilled]: (state, actions) => {
            state.user = actions.payload;
            localStorage.setItem('user', JSON.stringify(state.user));
            alert(state.user.msg);
            state.email = '';
            state.password = '';
            state.deactivateBtn = false;
        },
        [logUser.rejected]: (state, actions) => {
            alert(actions.payload);
            state.deactivateBtn = false;
        },
    }
});

export const { handleInputs, resetUserState, } = userSlice.actions;

export default userSlice.reducer;