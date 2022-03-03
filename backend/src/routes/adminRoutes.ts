import express from 'express';
import { groupCreateController } from '../controllers/admin/groupCreateController';

const router = express.Router();

router.post('/group', groupCreateController);

export default router;
