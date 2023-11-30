import Request from "../models/request.js";

export const request = async(req, res) =>{
    const { requestCreatorId, requesterBooksId, accepterBooksId, acceptersId } = req.body;
    // console.log({requestCreatorId, requesterBooksId, accepterBooksId, acceptersId})
    try {
        if (!requestCreatorId || !requesterBooksId || !accepterBooksId || !acceptersId) return res.status(400).json({msg: "Oops something went wrong"});
        const request = await Request.create({ requestCreatorId, requesterBooksId, accepterBooksId, acceptersId });
        res.status(200).json({ request, msg: 'Request successfully  created' });
    } catch (error) {
        res.status(400).json(error);
    } 
};
export const getRequestData = async (req, res) =>{
    try {
        const requestData = await Request.find().sort({ _id: -1});
     //    console.log(users)  
        res.status(200).json({ result: requestData });
    } catch (error) {
     //    res.status(404).json({message: error.message})
        res.status(404).json(error);
    }
 };