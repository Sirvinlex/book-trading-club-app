import Request from "../models/request.js";

export const request = async(req, res) =>{
    const { requestCreatorId, requesterBooksId, accepterBooksId, acceptersId } = req.body;
    try {
        if (!requestCreatorId || !requesterBooksId || !accepterBooksId || !acceptersId) return res.status(400).json({msg: "Oops something went wrong"});
        const request = await Request.create({ requestCreatorId, requesterBooksId, accepterBooksId, acceptersId });
        res.status(200).json({ request, msg: 'Request successfully created' });
    } catch (error) {
        res.status(400).json(error);
    } 
};
export const getRequestData = async (req, res) =>{
    try {
        const requestData = await Request.find().sort({ _id: -1});
        if (!requestData) return res.status(400).json({msg: 'Oops! Something went wrong'});
        res.status(200).json({ result: requestData });
    } catch (error) {
        res.status(404).json(error);
    }
 };
export const getSingleBookRequestData = async (req, res) =>{
    const { id } = req.params;
    try {
        const requestData = await Request.find().sort({ _id: -1});
        if (!requestData) return res.status(400).json({msg: 'Oops! Something went wrong'});
        const singleBookRequestData = requestData.filter((item) => item.accepterBooksId.includes(id));
        res.status(200).json({ result: singleBookRequestData });
    } catch (error) {
        res.status(404).json(error);
    }
 };

 export const  updateRequestData = async(req, res) =>{
    const { requestId, userBookIds, userId } = req.body; 
    try {
        if (!userBookIds || !requestId  || !userId) return res.status(400).json({msg: 'Oops! Something went wrong'});
        const request = await Request.findById(requestId);
        if (!request) return res.status(400).json({msg: 'Oops! something went wrong'});
        let tempAcceptersId = request.acceptersId;
        tempAcceptersId = tempAcceptersId.filter((tempAccId) => tempAccId !== userId);
        let tempAccepterBooksId = request.accepterBooksId;
        const tempArr = [];
        tempAccepterBooksId.forEach((item) =>{ 
            if (!userBookIds.includes(item)) tempArr.push(item)
        })
        tempAccepterBooksId = tempArr;
        const updatedRequest = await Request.findByIdAndUpdate({ _id: requestId }, { accepterBooksId: tempAccepterBooksId, acceptersId: tempAcceptersId}, 
            {new: true, runValidators: true})
        
        // check if the rejecting user book id is the last book id in the accepterBooksId, so that the rquest will be deleted, also the 
        // request creator request book prpoerties should be updated when the request is deleted, so we can send the updateBookPropData from here
        const requesterUpdateBookPropData = { 
            requesterBookProp: updatedRequest.requesterBooksId.map((myData) =>{
                return { bookId: myData}
            }), 
            accepterBookProp: [],
            IsCancelled: true,
        };
        let isAcceptersBookEmpty = false;
        if (updatedRequest.accepterBooksId.length < 1) isAcceptersBookEmpty = true;
        res.status(200).json({ requestId, isAcceptersBookEmpty, updateBookPropData: requesterUpdateBookPropData, msg: 'Request data updated successfully' });
    } catch (error) { 
        res.status(400).json(error);
    }
};
 export const deleteRequestData = async(req, res) =>{
    const { params: { id: dataId } } = req;
    try {
        const requestData = await Request.findByIdAndRemove({ _id: dataId });
        if (!requestData) return res.status(400).json({msg: 'No book with this Id'});
        res.status(200).json({deletedId: dataId, msg: 'Request data Successfully deleted'});
    } catch (error) {
        res.status(404).json(error);
    }
};