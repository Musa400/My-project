import express from 'express'
import { signup } from '../controller/authController.js';

let router = express.Router();

router.post('/signup',signup)

export default router