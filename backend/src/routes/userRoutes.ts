import express from 'express';
import { userUpdateController } from '../controllers/user/userUpdateController';

const router = express.Router();

router.put('/:id', userUpdateController);

export default router;
