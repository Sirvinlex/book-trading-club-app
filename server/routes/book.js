import express from 'express';
import { createBook, getBooks } from '../controllers/book.js'

const router = express.Router();

router.post('/createBook', createBook);
router.get('/getBooks', getBooks);

export default router;