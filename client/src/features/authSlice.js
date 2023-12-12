import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

const initialState = {
    name: '',
    email: '',
    password: '',
    user: {},
    toggleUser: false,
    loading: false,
    deactivateBtn: false,
    hasUpdatedProfile: true,
};

export const regUser = createAsyncThunk('register/user', async (regData, thunkAPI) =>{
    try {
        const {data} = await api.registerUser(regData);
        return data;
    } catch (error) {
        return  thunkAPI.rejectWithValue(error.response.data.msg);
    }

});

export const logUser = createAsyncThunk('login/user', async (loginData, thunkAPI) =>{
    try {
        const {data} = await api.loginUser(loginData);
        return data;
    } catch (error) {        
        return  thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        handleInputs: (state, {payload: {name, value}}) =>{
            state[name] = value;
        },
        resetUserState: (state) =>{
            state.user = {};
        },
        toggleOnHasUpdateProfile: (state) =>{
            state.hasUpdatedProfile = true;
        },
        toggleOffHasUpdateProfile: (state) =>{
            state.hasUpdatedProfile = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(regUser.pending, (state, action) => {
            state.deactivateBtn = true;
        })
        builder.addCase(regUser.fulfilled, (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(state.user));
            alert(state.user.msg);
            state.name = '';
            state.email = '';
            state.password = '';
            state.deactivateBtn = false;
        })
        builder.addCase(regUser.rejected, (state, action) => {
            alert(action.payload);
            state.deactivateBtn = false;       
        })
        builder.addCase(logUser.pending, (state, action) => {
            state.deactivateBtn = true;       
        })
        builder.addCase(logUser.fulfilled, (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(state.user));
            alert(state.user.msg);
            state.email = '';
            state.password = '';
            state.deactivateBtn = false;       
        })
        builder.addCase(logUser.rejected, (state, action) => {
            alert(action.payload);
            state.deactivateBtn = false;      
        })
      },
   
});

export const { handleInputs, resetUserState, toggleOffHasUpdateProfile, toggleOnHasUpdateProfile} = authSlice.actions;

export default authSlice.reducer;