import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import { UserRole } from '../interfaces/IUser';

export const getUsersByRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role } = req.params;
    
    if (!Object.values(UserRole).includes(role as UserRole)) {
      res.status(400).json({ message: 'Rol no válido' });
    }

    const users = await UserService.getUsersByRole(role as UserRole);
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getResidentsWithApartments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const residents = await UserService.getUsersByRole(UserRole.RESIDENTE);
    res.json(residents);
  } catch (error) {
    next(error);
  }
};