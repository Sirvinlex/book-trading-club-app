import mongoose from 'mongoose';

// const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : String,
    email: { type: String, 
        // unique: true
    },
    password: {
        type: String,
        minLength: 3
    },
    city: {
        type: String,
        default: null,
    },
    state:  {
        type: String,
        default: null,
    },
    address:  {
        type: String,
        default: null,
    },
    activeRequest:  {
        type: Number,
        default: 0,
    },
    books:  {
        type: Number,
        default: 0,
    },
},
{ timestamps: true }
);

const User = mongoose.model('User', UserSchema);
// module.exports = User;
export default User;