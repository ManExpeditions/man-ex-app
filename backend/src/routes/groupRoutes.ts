import express from 'express';
import { groupGetController } from '../controllers/groups/groupGetController';
import { groupsGetController } from '../controllers/groups/groupsGetController';

const router = express.Router();

router.get('/', groupsGetController);
router.get('/:id', groupGetController);

export default router;
