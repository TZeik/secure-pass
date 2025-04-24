import { Document } from 'mongoose';

export enum UserRole {
  RESIDENTE = 'residente',
  GUARDIA = 'guardia',
}

export interface IUserInput {
  nombre: string;
  email: string;
  password: string;
  role: UserRole;
  apartamento?: string;
  torre?: string;
}

export interface IUser extends IUserInput, Document {
  fechaRegistro: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}