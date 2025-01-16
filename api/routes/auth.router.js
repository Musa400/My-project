import express from 'express'
import { google, signin, signup, } from '../controller/authController.js';

let router = express.Router();

router.post('/signup',signup)
router.post('/signin', signin)
router.post('/google', google)

export default router