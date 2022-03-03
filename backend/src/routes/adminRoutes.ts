import express from 'express';
import { experienceCreateController } from '../controllers/admin/experienceCreateController';
import { experienceUpdateController } from '../controllers/admin/experienceUpdateController';
import { groupCreateController } from '../controllers/admin/groupCreateController';
import { groupUpdateController } from '../controllers/admin/groupUpdateController';

const router = express.Router();

router.post('/experience', experienceCreateController);
router.put('/experience/:id', experienceUpdateController);
router.post('/group/:id', groupCreateController);
router.put('/group/:id', groupUpdateController);

export default router;
