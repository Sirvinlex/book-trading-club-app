import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

const initialState = {
    users: [],
    userDetails: {},
    isLoading: false,
    name: '',
    city: '',
    userState: '',
    address: '',
    updateProfileMessage: '',
    profileUpdateResult: {}
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
    return data;
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
      handleCity:(state, {payload: {city, stateCity}}) =>{
            state[city] = stateCity;
      },
      handleState:(state, {payload: {userState, stateState}}) =>{
        // console.log(userState, stateState)
            state[userState] = stateState;
      },
      handleAddress:(state, {payload: {address, stateAddress}}) =>{
            state[address] = stateAddress;
      },
      resetUpdateProfileMessage:(state, actions) =>{
            state.updateProfileMessage = '';
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
        [updateUserProfile.pending]: (state, actions) => {
            state.isLoading = true;
        },
        [updateUserProfile.fulfilled]: (state, actions) => {
            state.updateProfileMessage = actions.payload.msg;
            state.profileUpdateResult = actions.payload.result;
            state.isLoading = false;
            alert('Your profile has been updated successfully');
            state.name = '';
            state.city = '';
            state.userState = '';
            state.address = '';
        },
        [updateUserProfile.rejected]: (state, actions) => {
            alert(actions.payload.message);
           state.isLoading = false;
        },
    }
});
// Your profile has been updated successfully
export const { handleEditProfileInputs, handleAddress, handleCity, handleName, handleState, resetUpdateProfileMessage } = usersSlice.actions;

export default usersSlice.reducer;