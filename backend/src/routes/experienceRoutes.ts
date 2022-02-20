import express from 'express';
import { experienceCreateController } from '../controllers/experiences/experienceCreateController';
import { experienceGetController } from '../controllers/experiences/experienceGetController';
import { experiencesGetController } from '../controllers/experiences/experiencesGetController';
import { experienceUpdateController } from '../controllers/experiences/experienceUpdateController';

const router = express.Router();

router.put('/:id', experienceUpdateController);
router.post('/', experienceCreateController);
router.get('/:id', experienceGetController);
router.get('/', experiencesGetController);

export default router;
