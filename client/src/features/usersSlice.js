import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

const initialState = {
    users: [],
    userDetails: {},
    isLoading: false,
    name: '',
    city: '',
    state: '',
    address: '',
};

export const getUsers = createAsyncThunk('getUsers/allUsers', async (_, thunkAPI) =>{
  try {
    const {data} = await api.getUsers(); 
    // console.log(data)
    return data;
  } catch (error) {
    // console.log(error)
    // return  thunkAPI.rejectWithValue(error.response.data.msg);
    return  thunkAPI.rejectWithValue(error);
  }
});
export const getUserDetails = createAsyncThunk('getUsers/userDetails', async (id, thunkAPI) =>{
  try {
    const {data} = await api.getUserDetails(id); 
    // console.log(data)
    return data
  } catch (error) {
    // console.log(error)
    // return  thunkAPI.rejectWithValue(error.response.data.msg);
    return  thunkAPI.rejectWithValue(error);
  }
});

export const updateUserProfile = createAsyncThunk('updateUser/userProfile', async (updateData, thunkAPI) =>{
  try {
    // console.log(updateData, 'data')
    const {data} = await api.updateUserProfile(updateData); 
    // console.log(data)
    return data
  } catch (error) {
    // console.log(error)
    // return  thunkAPI.rejectWithValue(error.response.data.msg);
    return  thunkAPI.rejectWithValue(error);
  }
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers:{
      handleEditProfileInputs: (state, {payload: {name, value}}) =>{
            state[name] = value;
      },
      handleName:(state, {payload: {name, stateName}}) =>{
        // console.log(name, stateName, 'test')
            state[name] = stateName;
      },
      handleCity:(state, {payload: {name, stateCity}}) =>{
            state[name] = stateCity;
      },
      handleState:(state, {payload: {name, stateState}}) =>{
            state[name] = stateState;
      },
      handleAddress:(state, {payload: {name, stateAddress}}) =>{
            state[name] = stateAddress;
      },
    },
    extraReducers:{
        [getUsers.pending]: (state, actions) => {
            state.isLoading = true;
        },
        [getUsers.fulfilled]: (state, actions) => {
            state.users = actions.payload?.result;
            state.isLoading = false;
        },
        [getUsers.rejected]: (state, actions) => {
            alert(actions.payload.message);
           state.isLoading = false;
        },
        [getUserDetails.pending]: (state, actions) => {
            state.isLoading = true;
        },
        [getUserDetails.fulfilled]: (state, actions) => {
            state.userDetails = actions.payload;
            state.isLoading = false;
        },
        [getUserDetails.rejected]: (state, actions) => {
            alert(actions.payload.message);
           state.isLoading = false;
        },
    }
});

export const { handleEditProfileInputs, handleAddress, handleCity, handleName, handleState } = usersSlice.actions;

export default usersSlice.reducer;