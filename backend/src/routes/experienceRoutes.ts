import express from 'express';
import { experienceGetController } from '../controllers/experiences/experienceGetController';
import { experiencesGetController } from '../controllers/experiences/experiencesGetController';

const router = express.Router();

router.get('/:id', experienceGetController);
router.get('/', experiencesGetController);

export default router;
