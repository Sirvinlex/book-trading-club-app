import express from 'express';
import { request, getRequestData, deleteRequestData, updateRequestData, getSingleBookRequestData } from '../controllers/request.js'

const router = express.Router();

router.post('/create-request', request);
router.get('/getRequestData', getRequestData);
router.get('/getSingleBookRequestData/:id', getSingleBookRequestData);
router.patch('/updateRequestData', updateRequestData);
router.delete('/deleteRequestData/:id', deleteRequestData);

export default router;