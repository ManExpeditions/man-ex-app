import express from 'express';
import { userUpdateController } from '../controllers/user/userUpdateController';
import { userVerifyEmailController } from '../controllers/user/userVerifyEmailController';
import { userVerifyPhoneController } from '../controllers/user/userVerifyPhoneController';
import { userVerificationCodeController } from '../controllers/user/userVerificationCodeController';
import { userValidateController } from '../controllers/user/userValidateController';
import { userDeleteController } from '../controllers/user/userDeleteController';
import { userGetProfileController } from '../controllers/user/userGetProfileController';
import { userAddToFavoritesController } from '../controllers/user/userAddToFavoritesController';
import { userRemoveFromFavoritesController } from '../controllers/user/userRemoveFromFavoritesController';
import { userGetOrdersController } from '../controllers/user/userGetOrdersController';
import { userForgotPasswordController } from '../controllers/user/userForgotPasswordController';
import { userPasswordResetController } from '../controllers/user/userPasswordResetController';
import { usersGetFeaturedMembersController } from '../controllers/user/usersGetFeaturedMembersController';

const router = express.Router();

router.put('/:id', userUpdateController);
router.delete('/:id', userDeleteController);
router.get('/:id/profile', userGetProfileController);
router.get('/:id/orders', userGetOrdersController);
router.post('/:id/verify/email', userVerifyEmailController);
router.post('/:id/verify/phone', userVerifyPhoneController);
router.post('/:id/verify/code', userVerificationCodeController);
router.post('/:id/validate', userValidateController);
router.patch('/:id/favorites/add', userAddToFavoritesController);
router.patch('/:id/favorites/remove', userRemoveFromFavoritesController);
router.post('/forgotpassword', userForgotPasswordController);
router.post('/resetpassword', userPasswordResetController);
router.get('/featuredmembers', usersGetFeaturedMembersController);

export default router;
