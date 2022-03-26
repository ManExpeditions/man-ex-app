import express from 'express';
import { groupGetController } from '../controllers/groups/groupGetController';
import { groupInterestedUserController } from '../controllers/groups/groupInterestedUserController';
import { groupsGetController } from '../controllers/groups/groupsGetController';

const router = express.Router();

router.get('/', groupsGetController);
router.put('/:id/interested', groupInterestedUserController);
router.get('/:id', groupGetController);

export default router;
