import express from 'express';
import { singlePhotoController } from '../controllers/assets/singlePhotoController';

const router = express.Router();

router.post('/upload/photo', singlePhotoController);

export default router;
