import express from 'express';
import { experienceGetController } from '../controllers/experiences/experienceGetController';
import { experienceInterestedUserController } from '../controllers/experiences/experienceInterestedUserController';
import { experiencesGetController } from '../controllers/experiences/experiencesGetController';

const router = express.Router();

router.get('/:id', experienceGetController);
router.put('/:id/interested', experienceInterestedUserController);
router.get('/', experiencesGetController);

export default router;
