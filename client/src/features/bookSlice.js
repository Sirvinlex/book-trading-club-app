import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';


const initialState = {
    book: [],
    title : '',
    description: '',
    isLoading: false,
    // bookId: '',
    // creatorName: '',
    // creatorId: '',
    // requests: 0,
    // requestersNameId: [],
    // creatorCity: '',
    // creatorState: '',
};

export const createBook = createAsyncThunk('createBook/book', async (bookData, thunkAPI) =>{
    try {
        const {data} = await api.createBook(bookData);
        // console.log(data)
        return data;
    } catch (error) {
        return  thunkAPI.rejectWithValue(error.response.data.msg);
    }

});
export const getBooks = createAsyncThunk('getBooks/book', async (_, thunkAPI) =>{
    try {
        const {data} = await api.getBooks();
        // console.log(data)
        return data;
    } catch (error) {
        return  thunkAPI.rejectWithValue(error.response.data.msg);
    }

});

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers:{
        handleInput: (state, {payload: { name, value }}) =>{
            state[name] = value;
      },
    },
    extraReducers:{
        [createBook.pending]: (state, actions) => {
            state.isLoading = true;
        },
        [createBook.fulfilled]: (state, actions) => {
            alert(actions.payload.msg);
            state.title = '';
            state.description = '';
            state.isLoading = false;
        },
        [createBook.rejected]: (state, actions) => {
            alert(actions.payload);
            state.isLoading = false;
        },
        [getBooks.pending]: (state, actions) => {
            state.isLoading = true;
        },
        [getBooks.fulfilled]: (state, actions) => {
            state.book = actions.payload.result;
            state.isLoading = false;
        },
        [getBooks.rejected]: (state, actions) => {
            alert(actions.payload);
            state.isLoading = false;
        },
    }
});

export const { handleInput } = bookSlice.actions;

export default bookSlice.reducer;