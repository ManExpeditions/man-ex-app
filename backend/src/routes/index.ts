import express from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';

const router = express.Router();

router.use('/auth/v1', authRoutes);
router.use('/user/v1', userRoutes);

export default router;
