import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';


const initialState = {
    createdBook: {},
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
    
    extraReducers: (builder) => {
        builder.addCase(createBook.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(createBook.fulfilled, (state, action) => {
            alert(action.payload.msg);
            state.createdBook = action.payload.book;
            state.title = '';
            state.description = '';
            state.isLoading = false;
        })
        builder.addCase(createBook.rejected, (state, action) => {
            alert(action.payload);
            state.isLoading = false;
        })
        builder.addCase(getBooks.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getBooks.fulfilled, (state, action) => {
            state.book = action.payload.result;
            state.isLoading = false;
        })
        builder.addCase(getBooks.rejected, (state, action) => {
            alert(action.payload);
            state.isLoading = false;
        })
      },
    
});

export const { handleInput } = bookSlice.actions;

export default bookSlice.reducer;