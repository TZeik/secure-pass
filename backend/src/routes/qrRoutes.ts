import { Router } from 'express';
import { generarQR } from '../controllers/qrController';
import { verifyToken } from '../middlewares/authMiddleware'; // Asegúrate de importar tu middleware de autenticación si es necesario

const router = Router();

// Ruta para generar un código QR

// POST /api/qr/generar

router.post('/generar', verifyToken, generarQR);

export default router;