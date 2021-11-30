import express from 'express';
import { userUpdateController } from '../controllers/user/userUpdateController';
import { userVerificationController } from '../controllers/user/userVerificationController';

const router = express.Router();

router.put('/:id', userUpdateController);
router.post('/:id/verify', userVerificationController);

export default router;
