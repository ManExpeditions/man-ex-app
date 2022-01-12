import express from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import serviceRoutes from './serviceRoutes';

const router = express.Router();

router.use('/auth/v1', authRoutes);
router.use('/user/v1', userRoutes);
router.use('/services/v1', serviceRoutes);

export default router;
