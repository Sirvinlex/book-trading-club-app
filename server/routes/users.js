import express from 'express';
import { getUsers, getUserDetails, updateUserProfile } from '../controllers/users.js'

const router = express.Router();

router.get('/getUsers', getUsers );
router.get('/getUsers/:id', getUserDetails );
router.patch('/getUsers/:id', updateUserProfile);

export default router;