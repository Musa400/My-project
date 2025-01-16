import express from 'express'
import { test,updateUser } from '../controller/userController.js';
import { verfiytokens } from '../utils/verfiyUser.js';

let router = express.Router();

 router.get('/test',test);
 router.post('/update/:id',verfiytokens, updateUser)
 export default router
 