import express from 'express';
import { getUsers, getUserDetails, updateUserProfile, updateUserBookCount, updateUserRequestCount } from '../controllers/users.js'

const router = express.Router();

router.get('/getUsers', getUsers );
router.get('/getUsers/:id', getUserDetails );
router.patch('/updateUserProfile/:id', updateUserProfile);
router.patch('/updateUserBookCount', updateUserBookCount);
router.patch('/updateUserRequestCount', updateUserRequestCount);

export default router;