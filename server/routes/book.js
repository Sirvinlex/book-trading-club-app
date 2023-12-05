import express from 'express';
import { createBook, getBooks, deleteBook, getUserBooks, updateBookProps } from '../controllers/book.js'

const router = express.Router();

router.post('/createBook', createBook);
router.get('/getBooks', getBooks);
router.patch('/updateBookProps', updateBookProps);
router.get('/getUserBooks/:id', getUserBooks);
router.delete('/deleteBook/:id', deleteBook);

export default router;