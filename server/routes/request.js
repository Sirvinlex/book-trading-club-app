import express from 'express';
import { request, getRequestData, deleteRequestData } from '../controllers/request.js'

const router = express.Router();

router.post('/create-request', request);
router.get('/getRequestData', getRequestData);
router.delete('/deleteRequestData/:id', deleteRequestData);

export default router;