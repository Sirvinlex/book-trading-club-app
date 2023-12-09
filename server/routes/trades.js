import express from 'express';
import { createTrade, getTrades } from '../controllers/trades.js'

const router = express.Router();

router.post('/createTrade', createTrade);
router.get('/getTrades', getTrades);

export default router;