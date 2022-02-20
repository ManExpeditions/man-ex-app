import express from 'express';
import { experienceCreateController } from '../controllers/experiences/experienceCreateController';
import { experienceUpdateController } from '../controllers/experiences/experienceUpdateController';

const router = express.Router();

router.put('/:id', experienceUpdateController);
router.post('/', experienceCreateController);

export default router;
