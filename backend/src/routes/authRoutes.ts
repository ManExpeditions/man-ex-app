import express from 'express';
import { emailRegistrationController } from '../controllers/auth/register/emailRegistrationController';
import { emailSigninController } from '../controllers/auth/signin/emailSigninController';

const router = express.Router();

router.post('/register/email', emailRegistrationController);
router.post('/signin/email', emailSigninController);

export default router;
