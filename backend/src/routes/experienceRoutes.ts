import express from 'express';
import { experienceCreateController } from '../controllers/admin/experienceCreateController';
import { experienceUpdateController } from '../controllers/admin/experienceUpdateController';
import { experienceGetController } from '../controllers/experiences/experienceGetController';
import { experiencesGetController } from '../controllers/experiences/experiencesGetController';

const router = express.Router();

router.put('/:id', experienceUpdateController);
router.post('/', experienceCreateController);
router.get('/:id', experienceGetController);
router.get('/', experiencesGetController);

export default router;
