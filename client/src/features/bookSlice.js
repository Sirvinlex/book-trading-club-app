import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserBookCount, updateUserRequestCount, updateUserTradeCount } from './usersSlice';
import * as api from '../api';


const initialState = {
    createdBook: {},
    book: [],
    userBooks: [],
    title : '',
    description: '',
    isLoading: false,
    requestedBooks: [],
    requestData: [],
    isCreateRequestSuccessful: false,
    trades: [],
    createTradeMsg: '',
    creatingRequest: false,
    };

export const createBook = createAsyncThunk('createBook/book', async (bookData, thunkAPI) =>{
    try {
        const {data} = await api.createBook(bookData);
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
export const updateBookProps = createAsyncThunk('updateBookProps/book', async (updateData, thunkAPI) =>{
    try {
      const {data} = await api.updateBookProps(updateData); 
      if (data.msg === 'Book property updated successfully') thunkAPI.dispatch(getBooks());
      return data;
    } catch (error) {
      return  thunkAPI.rejectWithValue(error);
    }
  });
export const request = createAsyncThunk('request/book', async (requestData, thunkAPI) =>{
    try {
        const {data} = await api.request(requestData.createRequestData);
        if (data.msg === 'Request successfully created'){
            thunkAPI.dispatch(updateBookProps(requestData.updateBookPropData));
            thunkAPI.dispatch(updateUserRequestCount(requestData.updateUserRequestCountData));
        }
        return data;
    } catch (error) {
        return  thunkAPI.rejectWithValue(error.response.data.msg);
    }

});
export const getRequestData = createAsyncThunk('getRequestData/book', async (_, thunkAPI) =>{
    try {
        const {data} = await api.getRequestData();
        return data;
    } catch (error) {
        return  thunkAPI.rejectWithValue(error.response.data.msg);
    }

});
export const updateRequestData = createAsyncThunk('updateRequestData/book', async (updateData, thunkAPI) =>{
    try {
        const { requestUpdateData, updateBookPropData, updateUserRequestCountData } = updateData;
      const {data} = await api.updateRequestData(requestUpdateData); 
      if (data.msg === 'Request data updated successfully') {
        thunkAPI.dispatch(getRequestData());
        thunkAPI.dispatch(updateBookProps(updateBookPropData));
      }
    
      if (data.isAcceptersBookEmpty === true) {
        thunkAPI.dispatch(deleteRequestData({cancelData: {dataId: data.requestId, role: ''}, updateBookPropData: data.updateBookPropData,
        updateUserRequestCountData
        }));
      }
      return data;
    } catch (error) {
      return  thunkAPI.rejectWithValue(error);
    }
  });
export const deleteRequestData = createAsyncThunk('deleteRequestData/book', async (delData, thunkAPI) =>{
    try {
        const { dataId, role } = delData.cancelData;
        const { updateBookPropData, updateUserRequestCountData } = delData;
        const {data} = await api.deleteRequestData(dataId);

        if (data.msg === "Request data Successfully deleted"){
             thunkAPI.dispatch(updateBookProps(updateBookPropData));
             thunkAPI.dispatch(updateUserRequestCount(updateUserRequestCountData));
        }

        return { data, role};
    } catch (error) {
        return  thunkAPI.rejectWithValue(error.response.data.msg);
    }

});
export const createTrade = createAsyncThunk('createTrade/book', async (tradeData, thunkAPI) =>{
    try {
        const {data} = await api.createTrade(tradeData);
        
        // After request is accepted and trade is successful, the two users exchanging book will have their completed trade count increased by 1
        // we can dispatch the action here, we just need the two users' IDs
        const userId = data.trade.idOfRequestCreator;
        const userId2 = data.trade.requestAccepterBooks[0].creatorId;
        const userIds =  [ userId, userId2 ];

        if(data.msg === 'Trade successfully added') thunkAPI.dispatch(updateUserTradeCount(userIds));
        return data;
    } catch (error) {
        return  thunkAPI.rejectWithValue(error.response.data.msg);
    }

});
export const getTrades = createAsyncThunk('getTrades/book', async (_, thunkAPI) =>{
    try {
        const {data} = await api.getTrades();
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
        })
        builder.addCase(createBook.fulfilled, (state, action) => {
            alert(action.payload.msg);
            state.createdBook = action.payload.book;
            state.title = '';
            state.description = '';
        })
        builder.addCase(createBook.rejected, (state, action) => {
            alert('Oops! an error occured');
        })
        builder.addCase(getBooks.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getBooks.fulfilled, (state, action) => {
            state.book = action.payload.result;
            state.isLoading = false;
        })
        builder.addCase(getBooks.rejected, (state, action) => {
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
        builder.addCase(request.pending, (state, action) => {
            state.creatingRequest = true;
        })
        builder.addCase(request.fulfilled, (state, action) => {
            state.isCreateRequestSuccessful = true;
            alert(action.payload.msg);
            state.requestedBooks = [];
            state.creatingRequest = false;
        })
        builder.addCase(request.rejected, (state, action) => {
            alert('Oops! something went wrong');
            state.creatingRequest = false;
        })
        builder.addCase(getRequestData.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getRequestData.fulfilled, (state, action) => {
            state.requestData = action.payload.result;
            state.isCreateRequestSuccessful = false;
            state.isLoading = false;
        })
        builder.addCase(getRequestData.rejected, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(deleteRequestData.fulfilled, (state, action) => {
            state.requestData = state.requestData.filter((item) => item._id !== action.payload.data.deletedId);
            if (action.payload.role === 'cancel') alert('Request successfully removed')
            else if (action.payload.role === 'accept') alert('Request successfully accepted')
        })
        builder.addCase(deleteRequestData.rejected, (state, action) => {
            alert('Oops! something went wrong'); 
        })
        builder.addCase(updateBookProps.fulfilled, (state, action) => {
        })
        builder.addCase(updateBookProps.rejected, (state, action) => {
            alert('Oops! something went wrong'); 
        })
        builder.addCase(updateRequestData.fulfilled, (state, action) => {
            alert('You rejected this request'); 
        })
        builder.addCase(createTrade.pending, (state, action) => {
        })
        builder.addCase(createTrade.fulfilled, (state, action) => {
            alert('You Successfully accepted this request!'); 
            state.createTradeMsg = action.payload.msg;
        })
        builder.addCase(createTrade.rejected, (state, action) => {
            alert('Oops! an error occured'); 
        })
        builder.addCase(getTrades.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(getTrades.fulfilled, (state, action) => {
            state.trades = action.payload.result;
            state.createTradeMsg = '';
            state.isLoading = false;
        })
        builder.addCase(getTrades.rejected, (state, action) => {
            state.isLoading = false;
            alert('Oops! something went wrong');
        })
      },
    
});

export const { handleInput, addBook, removeBook } = bookSlice.actions;

export default bookSlice.reducer;