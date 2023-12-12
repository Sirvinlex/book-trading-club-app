import mongoose from 'mongoose';


const BookSchema = new mongoose.Schema({
    title : String,
    description: String,
    creatorName: String,
    creatorId: String,
    isProposed: {
        type: Boolean,
        default: false,
    },
    proposed: {
        type: Number,
        default: 0,
    },
    requests: {
        type: Number,
        default: 0,
    },
    requestersNames: {
        type: [String],
        default: [],
    },
    requestersIds: {
        type: [String],
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
export default Book;

