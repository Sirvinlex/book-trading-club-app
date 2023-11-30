import express from 'express';
import { request, getRequestData } from '../controllers/request.js'

const router = express.Router();

router.post('/create-request', request);
router.get('/getRequestData', getRequestData);

export default router;