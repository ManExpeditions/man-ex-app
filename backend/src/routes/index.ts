import express from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import serviceRoutes from './serviceRoutes';
import assetRoutes from './assetRoutes';

const router = express.Router();

router.use('/auth/v1', authRoutes);
router.use('/user/v1', userRoutes);
router.use('/services/v1', serviceRoutes);
router.use('/assets/v1', assetRoutes);

export default router;
