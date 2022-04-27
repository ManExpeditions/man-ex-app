import express from 'express';
import { experienceCreateController } from '../controllers/admin/experienceCreateController';
import { experienceDeleteController } from '../controllers/admin/experienceDeleteController';
import { experienceUpdateController } from '../controllers/admin/experienceUpdateController';
import { groupCreateController } from '../controllers/admin/groupCreateController';
import { groupDeleteController } from '../controllers/admin/groupDeleteController';
import { groupUpdateController } from '../controllers/admin/groupUpdateController';
import { orderGetController } from '../controllers/admin/orderGetController';
import { ordersGetController } from '../controllers/admin/ordersGetController';
import { userGetController } from '../controllers/admin/userGetController';
import { usersGetController } from '../controllers/admin/usersGetController';

const router = express.Router();

router.get('/user', usersGetController);
router.get('/user/:id', userGetController);
router.post('/experience', experienceCreateController);
router.put('/experience/:id', experienceUpdateController);
router.delete('/experience/:id', experienceDeleteController);
router.delete('/group/:experienceId/:groupId', groupDeleteController);
router.post('/group/:id', groupCreateController);
router.put('/group/:id', groupUpdateController);
router.get('/order/:id', orderGetController);
router.get('/order', ordersGetController);

export default router;
