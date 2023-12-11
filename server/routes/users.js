import express from 'express';
import { getUsers, getUserDetails, updateUserProfile, updateUserBookCount, updateUserRequestCount, updateUserTradeCount } from '../controllers/users.js'

const router = express.Router();

router.get('/getUsers', getUsers );
router.get('/getUsers/:id', getUserDetails );
router.patch('/updateUserProfile/:id', updateUserProfile);
router.patch('/updateUserBookCount', updateUserBookCount);
router.patch('/updateUserRequestCount', updateUserRequestCount);
router.patch('/updateUserTradeCount', updateUserTradeCount);

export default router;