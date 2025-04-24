import { Document } from 'mongoose';

export enum UserRole {
  RESIDENTE = 'residente',
  GUARDIA = 'guardia',
}

export interface IUser extends Document {
  nombre: string;
  email: string;
  password: string;
  role: UserRole;
  apartamento?: string;
  torre?: string;
  fechaRegistro: Date;
  comparePassword(password: string): Promise<boolean>;
}