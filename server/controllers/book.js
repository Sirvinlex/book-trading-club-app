import Book from "../models/book.js";

export const createBook = async(req, res) =>{
    const { title, description, creatorName, creatorId, creatorState, creatorCity } = req.body;
    try {
        if (!title || !description) return res.status(400).json({msg: "Please provide all values"});
        const book = await Book.create({ title, description, creatorName, creatorId, creatorState, creatorCity });
        res.status(200).json({ book, msg: 'Book successfully added' });
    } catch (error) {
        res.status(400).json(error);
    } 
};
export const getBooks = async (req, res) =>{
    try {
        const books = await Book.find().sort({ _id: -1});
     //    console.log(users)  
        res.status(200).json({ result: books })
    } catch (error) {
     //    res.status(404).json({message: error.message})
        res.status(404).json(error);
    }
 };
export const getUserBooks = async (req, res) =>{
    const { id } = req.params
    try {
        const userBooks = await Book.find({ creatorId: id }).sort({ _id: -1}).exec();
        res.status(200).json({ result: userBooks })
    } catch (error) {
        res.status(404).json(error);
    }
 }; 

export const deleteBook = async(req, res) =>{
    const { params: { id: bookId } } = req;
    try {
       const book = await Book.findByIdAndRemove({ _id: bookId });
        if (!book) return res.status(400).json({msg: 'No book with this Id'});
        res.status(200).json({deletedId: bookId, userId: book.creatorId, msg: 'Book Successfully deleted'});
    } catch (error) {
        res.status(404).json(error);
    }
};
export const updateBookProps = async(req, res) =>{
    const { requesterBookProp, accepterBookProp, IsCancelled } = req.body
    try {
        // console.log(requesterBookProp)
        // if (!requesterBookProp || !accepterBookProp) return res.status(400).json({msg: 'Oops! something went wrong'});
        for (let i = 0; i < requesterBookProp.length; i++){
            if(IsCancelled === false){
                const updatedBook = await Book.findByIdAndUpdate({ _id: requesterBookProp[i].bookId }, 
                    { isProposed: true }, {new: true, runValidators: true})
            }else{
                const updatedBook = await Book.findByIdAndUpdate({ _id: requesterBookProp[i].bookId }, 
                    { isProposed: false }, {new: true, runValidators: true})
            }
        }

        for (let i = 0; i < accepterBookProp.length; i++){
            const book = await Book.findById(accepterBookProp[i].bookId);
            let tempRequestersIds = book.requestersIds;

            if(IsCancelled === false){
                tempRequestersIds.push(accepterBookProp[i].requesterId);
                const updatedBook = await Book.findByIdAndUpdate({ _id: accepterBookProp[i].bookId }, 
                    { requests: book.requests + 1, requestersIds: tempRequestersIds }, {new: true, runValidators: true})
            }else{
                const index = tempRequestersIds.indexOf(accepterBookProp[i].requesterId);
                tempRequestersIds.splice(index, 1);
                const updatedBook = await Book.findByIdAndUpdate({ _id: accepterBookProp[i].bookId }, 
                    { requests: book.requests - 1, requestersIds: tempRequestersIds }, {new: true, runValidators: true})
            }
            
            
        }

        res.status(200).json({ msg: 'Book property updated successfully' });

        // requesterBookProp.forEach((item) =>{
        //     let isProposed
        //     // const book = await Book.findById(item.bookId)
        //     // console.log(book)
        // })

        // const book = await Book.findByIdAndUpdate({ _id: id }, { name, city, state: userState, address }, {new: true, runValidators: true})
        // if (!book) return res.status(400).json({msg: 'No book with this Id'});
        // res.status(200).json({ user });
    } catch (error) { 
        res.status(400).json(error);
    }
};