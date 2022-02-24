import express from 'express';
import { googlePlacesController } from '../controllers/services/googlePlacesController';
import { thriveCartController } from '../controllers/services/thriveCartController';

const router = express.Router();

router.post('/location', googlePlacesController);
router.post('/thrivecart', thriveCartController);

export default router;
