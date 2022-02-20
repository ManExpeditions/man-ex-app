import express from 'express';
import { experienceCreateController } from '../controllers/experiences/experienceCreateController';
import { experiencesGetController } from '../controllers/experiences/experiencesGetController';
import { experienceUpdateController } from '../controllers/experiences/experienceUpdateController';

const router = express.Router();

router.put('/:id', experienceUpdateController);
router.post('/', experienceCreateController);
router.get('/', experiencesGetController);

export default router;
