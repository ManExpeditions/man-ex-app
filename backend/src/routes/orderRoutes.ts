import express from 'express';
import { ordersGetController } from '../controllers/orders/ordersGetController';

const router = express.Router();

router.get('/', ordersGetController);

export default router;
