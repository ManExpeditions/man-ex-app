import express from 'express';
import authRoutes from './authRoutes';

const router = express.Router();

router.use('/auth/v1', authRoutes);

export default router;
