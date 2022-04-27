import express from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import experienceRoutes from './experienceRoutes';
import adminRoutes from './adminRoutes';
import groupRoutes from './groupRoutes';
import serviceRoutes from './serviceRoutes';
import assetRoutes from './assetRoutes';
import orderRoutes from './orderRoutes';

const router = express.Router();

router.use('/auth/v1', authRoutes);
router.use('/user/v1', userRoutes);
router.use('/experience/v1', experienceRoutes);
router.use('/admin/v1', adminRoutes);
router.use('/group/v1', groupRoutes);
router.use('/services/v1', serviceRoutes);
router.use('/assets/v1', assetRoutes);
router.use('/orders/v1', orderRoutes);

export default router;
