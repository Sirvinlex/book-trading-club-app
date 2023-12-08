import Request from "../models/request.js";

export const request = async(req, res) =>{
    const { requestCreatorId, requesterBooksId, accepterBooksId, acceptersId } = req.body;
    // console.log({requestCreatorId, requesterBooksId, accepterBooksId, acceptersId})
    try {
        // console.log(accepterBooksId)
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
     //    console.log(users)  
        res.status(200).json({ result: requestData });
    } catch (error) {
     //    res.status(404).json({message: error.message})
        res.status(404).json(error);
    }
 };
//  userBookIds: [ '656e12acae7f0c4f347751b5', '656ac1ba07c6a5a4423f388b' ],     
//   requestId: '657108e1d81f8dda3d410a49'
 export const  updateRequestData = async(req, res) =>{
    const { requestId, userBookIds, userId } = req.body; 
    try {
        console.log(requestId, userBookIds, userId)
        // if (!userBookIds || !requestId) return res.status(400).json({msg: 'Oops! Something went wrong'});
        // const request = await Request.findById(requestId);
        // if (!request) return res.status(400).json({msg: 'Oops! something went wrong'});
        // let tempAccepterBooksId = request.accepterBooksId;
        // console.log(tempAccepterBooksId, 'first')
        // const tempArr = [];
        // tempAccepterBooksId.forEach((item) =>{ 
        //     if (!userBookIds.includes(item)) tempArr.push(item)
        // })
        // tempAccepterBooksId = tempArr;
        // console.log(tempAccepterBooksId, 'second')
        // const updatedRequest = await Request.findByIdAndUpdate({ _id: requestId }, { accepterBooksId: tempAccepterBooksId }, 
        //     {new: true, runValidators: true})
        // res.status(200).json({ msg: 'Request data updated successfully' });
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