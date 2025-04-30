import { Request, Response, RequestHandler } from 'express';
import QRCode from 'qrcode';

// Controlador para generar un código QR
export const generarQR: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { idVisita } = req.body;

    if (!idVisita) {
      res.status(400).json({ mensaje: 'El idVisita es requerido' });
      return;
    }

    const qrData = {
      id: idVisita,
      expiracion: Date.now() + 3600000, // 1 hora en milisegundos
    };

    const qrString = JSON.stringify(qrData);

    const qrImage = await QRCode.toDataURL(qrString); // Genera el QR en formato DataURL (base64)

    res.status(201).json({
      mensaje: 'QR generado exitosamente',
      qrImage,
    });
  } catch (error) {
    console.error('Error generando el QR:', error);
    res.status(500).json({ mensaje: 'Error generando el QR' });
  }
};

