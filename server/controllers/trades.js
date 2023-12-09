import Trades from "../models/trades.js";

export const createTrade = async(req, res) =>{
    const { idOfRequestCreator, requestCreatorBooks, requestAccepterBooks } = req.body;
    try {
        if (!idOfRequestCreator || !requestCreatorBooks || !requestAccepterBooks) return res.status(400).json({msg: "Oops! an error occured"});
        const trade = await Trades.create({ idOfRequestCreator, requestCreatorBooks, requestAccepterBooks });
        res.status(200).json({ trade, msg: 'Trade successfully added' });
    } catch (error) {
        res.status(400).json(error);
    } 
};
export const getTrades = async (req, res) =>{
    try {
        const trades = await Trades.find().sort({ _id: -1});
        res.status(200).json({ result: trades })
    } catch (error) {
     //    res.status(404).json({message: error.message})
        res.status(404).json(error);
    }
 };