import express from 'express';
import { userUpdateController } from '../controllers/user/userUpdateController';
import { userVerifyEmailController } from '../controllers/user/userVerifyEmailController';
import { userVerifyPhoneController } from '../controllers/user/userVerifyPhoneController';
import { userVerificationCodeController } from '../controllers/user/userVerificationCodeController';
import { userValidateController } from '../controllers/user/userValidateController';
import { userDeleteController } from '../controllers/user/userDeleteController';

import { userGetProfileController } from '../controllers/user/userGetProfileController';
import { userAddToFavoritesController } from '../controllers/user/userAddToFavoritesController';

const router = express.Router();

router.put('/:id', userUpdateController);
router.delete('/:id', userDeleteController);
router.get('/:id/profile', userGetProfileController);
router.post('/:id/verify/email', userVerifyEmailController);
router.post('/:id/verify/phone', userVerifyPhoneController);
router.post('/:id/verify/code', userVerificationCodeController);
router.post('/:id/validate', userValidateController);
router.patch('/:id/favorites/add', userAddToFavoritesController);

export default router;
