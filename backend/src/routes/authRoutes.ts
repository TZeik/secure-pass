import { Router } from "express";
import { authController } from "../controllers/authController";
import { authMiddleware, roleMiddleware } from "../middlewares/authMiddleware";

const router = Router();

// Rutas de autenticación
router.post('/auth/login', authController.loginUser);
router.post('/auth/register', authMiddleware, roleMiddleware(['admin']), authController.registerUser);
router.get('/auth/me', authMiddleware, authController.getCurrentUser);

export default router;