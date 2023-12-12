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
    profileUpdateResult: {},
};

export const getUsers = createAsyncThunk('getUsers/allUsers', async (_, thunkAPI) =>{
  try {
    const {data} = await api.getUsers(); 
    return data;
  } catch (error) {
    return  thunkAPI.rejectWithValue(error);
  }
});
export const getUserDetails = createAsyncThunk('getUsers/userDetails', async (id, thunkAPI) =>{
  try {
    const {data} = await api.getUserDetails(id); 
    return data
  } catch (error) {
    return  thunkAPI.rejectWithValue(error);
  }
});

export const updateUserProfile = createAsyncThunk('updateUser/userProfile', async (updateData, thunkAPI) =>{
  try {
    const {data} = await api.updateUserProfile(updateData); 
    return data;
  } catch (error) {
    return  thunkAPI.rejectWithValue(error);
  }
});
export const updateUserBookCount = createAsyncThunk('updateUserBookCount/userProfile', async (updateData, thunkAPI) =>{
  try {
    const {data} = await api.updateUserBookCount(updateData); 
    return data;
  } catch (error) {
    return  thunkAPI.rejectWithValue(error);
  }
});
export const updateUserRequestCount = createAsyncThunk('updateUserRequestCount/userProfile', async (updateData, thunkAPI) =>{
  try {
    const {data} = await api.updateUserRequestCount(updateData); 
    return data;
  } catch (error) {
    return  thunkAPI.rejectWithValue(error);
  }
});
export const updateUserTradeCount = createAsyncThunk('updateUserTradeCount/userProfile', async (updateData, thunkAPI) =>{
  try {
    const {data} = await api.updateUserTradeCount(updateData); 
    return data;
  } catch (error) {
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
            state[name] = stateName;
      },
      handleCity:(state, {payload: {city, stateCity}}) =>{
            state[city] = stateCity;
      },
      handleState:(state, {payload: {userState, stateState}}) =>{
            state[userState] = stateState;
      },
      handleAddress:(state, {payload: {address, stateAddress}}) =>{
            state[address] = stateAddress;
      },
      resetUpdateProfileMessage:(state, actions) =>{
            state.updateProfileMessage = '';
      },
      },
      extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state, action) => {
          state.isLoading = true;
        })
        builder.addCase(getUsers.fulfilled, (state, action) => {
          state.users = action.payload?.result;
          state.isLoading = false;
        })
        builder.addCase(getUsers.rejected, (state, action) => {
          alert(action.payload.message);
          state.isLoading = false;
        })
        builder.addCase(getUserDetails.pending, (state, action) => {
          state.isLoading = true;
        })
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
          state.userDetails = action.payload;
          state.isLoading = false;
        })
        builder.addCase(getUserDetails.rejected, (state, action) => {
          alert(action.payload.message);
          state.isLoading = false;
        })
        builder.addCase(updateUserProfile.pending, (state, action) => {
          state.isLoading = true;
        })
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
          state.updateProfileMessage = action.payload.msg;
          state.profileUpdateResult = action.payload.result;
          state.isLoading = false;
          alert('Your profile has been updated successfully');
          state.name = '';
          state.city = '';
          state.userState = '';
          state.address = '';
        })
        builder.addCase(updateUserProfile.rejected, (state, action) => {
          alert(action.payload.message);
          state.isLoading = false;
        })
        builder.addCase(updateUserBookCount.rejected, (state, action) => {
          alert('Oops! an error occured');
        })
        
      
    },
    
});
export const { handleEditProfileInputs, handleAddress, handleCity, handleName, handleState, resetUpdateProfileMessage } = usersSlice.actions;

export default usersSlice.reducer;