import mongoose from 'mongoose';

const TradesSchema = new mongoose.Schema({
    idOfRequestCreator : String,
    requestCreatorBooks: [],
    requestAccepterBooks: [],  
},
{ timestamps: true }
);

const Trades = mongoose.model('Trades', TradesSchema);
export default Trades;

