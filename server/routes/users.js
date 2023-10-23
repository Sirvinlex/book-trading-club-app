import express from 'express';
import { getUsers, getUserDetails } from '../controllers/users.js'

const router = express.Router();

router.get('/getUsers', getUsers )
router.get('/getUsers/:id', getUserDetails )

export default router;