import express from 'express';
import { emailRegistrationController } from '../controllers/auth/register/emailRegistrationController';

const router = express.Router();

router.post('/register/email', emailRegistrationController);

export default router;
