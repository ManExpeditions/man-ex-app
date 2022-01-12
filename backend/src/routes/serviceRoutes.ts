import express from 'express';
import { googlePlacesController } from '../controllers/services/googlePlacesController';

const router = express.Router();

router.post('/location', googlePlacesController);

export default router;
