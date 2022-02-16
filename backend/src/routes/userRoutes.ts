import express from 'express';
import { userUpdateController } from '../controllers/user/userUpdateController';
import { userVerifyEmailController } from '../controllers/user/userVerifyEmailController';
import { userVerifyPhoneController } from '../controllers/user/userVerifyPhoneController';
import { userVerificationCodeController } from '../controllers/user/userVerificationCodeController';
import { userValidateController } from '../controllers/user/userValidateController';

const router = express.Router();

router.put('/:id', userUpdateController);
router.post('/:id/verify/email', userVerifyEmailController);
router.post('/:id/verify/phone', userVerifyPhoneController);
router.post('/:id/verify/code', userVerificationCodeController);
router.post('/:id/validate', userValidateController);

export default router;
