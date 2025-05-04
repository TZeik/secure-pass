import { Router } from 'express';
import { getUsersByRole, getResidentsWithApartments } from '../controllers/userController';

const router = Router();

router.get('/users/role/:role', getUsersByRole);
router.get('/users/residents', getResidentsWithApartments);

export default router;