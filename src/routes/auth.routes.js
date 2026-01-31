import express from 'express';
const router = express.Router();
import { register, login } from '../controllers/auth.controller.js';
import sendEmail from '../utils/sendEmail.js';

router.post('/api/register', register);
router.post('/api/send', sendEmail);
router.post('/api/login', login);

export default router;