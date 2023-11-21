import mongoose from 'mongoose';

// const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title : String,
    description: String,
    creatorName: String,
    creatorId: String,
    requests: {
        type: Number,
        default: 0,
    },
    requestersNameId: {
        type: [[String]],
        default: [],
    },
    creatorCity: {
        type: String,
        default: null,
    },
    creatorState:  {
        type: String,
        default: null,
    },
},
{ timestamps: true }
);

const Book = mongoose.model('Book', BookSchema);
// module.exports = User;
export default Book;