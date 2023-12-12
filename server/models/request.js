import mongoose from 'mongoose';

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
export default Request;