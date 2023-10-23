import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';

const initialState = {
    users: [],
    isLoading: false,
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
    console.log(data)
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
    }
});

export const {  } = usersSlice.actions;

export default usersSlice.reducer;