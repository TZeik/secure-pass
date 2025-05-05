// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/UserService';

const jwtSecret = process.env.JWT_SECRET || '';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error('Autenticación requerida');
    }

    const decoded = jwt.verify(token, jwtSecret) as { id: string };
    const user = await UserService.findById(decoded.id);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    req.user = user;
    next();
  } catch (error: any) {
    res.status(401).json({ error: error.message || 'Autenticación fallida' });
  }
};

export const roleMiddleware = (requiredRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !requiredRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acceso no autorizado' });
    }
    
    next();
  };
};