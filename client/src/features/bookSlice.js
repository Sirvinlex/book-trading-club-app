import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserBookCount } from './usersSlice';
import * as api from '../api';


const initialState = {
    createdBook: {},
    book: [],
    userBooks: [],
    title : '',
    description: '',
    isLoading: false,
    requestedBooks: [],
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
        // thunkAPI.dispatch(updateUserBookCount())
        // thunkAPI.dispatch(updateUserBookCount({userId, isIncreased: true}))
        console.log(data)
        if(data.msg ===  "Book successfully added") {
            const userId = data.book.creatorId;
            thunkAPI.dispatch(updateUserBookCount({userId, isIncreased: true}))
        };
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
export const deleteBook = createAsyncThunk('deleteBook/book', async (bookId, thunkAPI) =>{
    try {
        const {data} = await api.deleteBook(bookId);
        if (data.msg === 'Book Successfully deleted'){
            const userId = data.userId;
            thunkAPI.dispatch(updateUserBookCount({userId, isIncreased: false}));
        };
        return data;
    } catch (error) {
        return  thunkAPI.rejectWithValue(error.response.data.msg);
    }

});
export const getUserBooks = createAsyncThunk('getUserBooks/book', async (userId, thunkAPI) =>{
    try {
        const {data} = await api.getUserBooks(userId);
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
        addBook: (state, action) =>{
            let tempState = state.requestedBooks;
            tempState.push(action.payload);
            state.requestedBooks = tempState;
        },
        removeBook: (state, action) =>{
            let tempState = state.requestedBooks;
            tempState = tempState.filter((item) => item.bookId !== action.payload.bookId);
            state.requestedBooks = tempState;
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
            // alert(action.payload);
            alert('Oops! an error occured');
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
            // alert(action.payload);
            alert('Oops! an error occured');
            state.isLoading = false;
        })
        builder.addCase(deleteBook.fulfilled, (state, action) => {
            state.book = state.book.filter((item) => item._id !== action.payload.deletedId);
            state.userBooks = state.userBooks.filter((item) => item._id !== action.payload.deletedId);
            alert(action.payload.msg);
        })
        builder.addCase(deleteBook.rejected, (state, action) => {
            alert('Oops! an error occured');
        })
        builder.addCase(getUserBooks.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getUserBooks.fulfilled, (state, action) => {
            state.userBooks = action.payload.result;
            state.isLoading = false;
        })
        builder.addCase(getUserBooks.rejected, (state, action) => {
            alert('Oops! an error occured');
            state.isLoading = false;
        })
      },
    
});

export const { handleInput, addBook, removeBook } = bookSlice.actions;

export default bookSlice.reducer;