import express from 'express'
import { test } from '../controller/userController.js';

let router = express.Router();

 router.get('/test',test)
 export default router
 