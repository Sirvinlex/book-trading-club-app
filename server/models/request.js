import mongoose from 'mongoose';

// const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    requestCreatorId: String,
    requesterBooksId: {
        type: [String],
        default: [],
    },
    accepterBooksId: {
        type: [String],
        default: [],
    },
},
{ timestamps: true }
);

const Request = mongoose.model('Book', RequestSchema);
// module.exports = User;
export default Request;