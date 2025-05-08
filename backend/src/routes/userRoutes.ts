import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { userController } from '../controllers/userController';

const router = Router();

// Rutas de autenticación
router.post('/auth/register', authController.registerUser);
router.post('/auth/login', authController.loginUser);
router.get('/auth/me', authMiddleware, authController.getCurrentUser);

// Rutas de usuarios
router.get('/residents', userController.getResidents);
router.get('/guards', userController.getGuards);
router.get('/admins', userController.getAdmins);
router.get('/users', userController.getAllUsers);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

export default router;