import mongoose from 'mongoose';

// const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
    requestCreatorId: String,
    acceptersId: {
        type: [String],
        default: [],
    },
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

const Request = mongoose.model('Request', RequestSchema);
// module.exports = User;
export default Request;