import { Router } from 'express';
import { getUsersByRole, getResidentsWithApartments } from '../controllers/userController';
import { authController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Rutas de autenticación
router.post('/auth/register', authController.registerUser);
router.post('/auth/login', authController.loginUser);
router.get('/auth/me', authMiddleware, authController.getCurrentUser);

// Rutas de usuarios
router.get('/users/role/:role', getUsersByRole);
router.get('/users/residents', getResidentsWithApartments);

export default router;