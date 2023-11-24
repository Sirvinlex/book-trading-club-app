import express from 'express';
import { createBook, getBooks, deleteBook } from '../controllers/book.js'

const router = express.Router();

router.post('/createBook', createBook);
router.get('/getBooks', getBooks);
router.delete('/deleteBook/:id', deleteBook);

export default router;