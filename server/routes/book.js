import express from 'express';
import { createBook, getBooks, deleteBook, getUserBooks, request } from '../controllers/book.js'

const router = express.Router();

router.post('/createBook', createBook);
router.post('/request', request);
router.get('/getBooks', getBooks);
router.get('/getUserBooks/:id', getUserBooks);
router.delete('/deleteBook/:id', deleteBook);

export default router;