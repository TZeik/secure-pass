import { Router } from 'express';
import { generarQR } from '../controllers/qrController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Ruta para generar un código QR
// POST /api/qr/generar

router.post('/qr/generate', authMiddleware, generarQR);

export default router;