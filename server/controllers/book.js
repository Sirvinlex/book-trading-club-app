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
        const books = await Book.find();
     //    console.log(users)  
        res.status(200).json({ result: books })
    } catch (error) {
     //    res.status(404).json({message: error.message})
        res.status(404).json(error);
    }
 };