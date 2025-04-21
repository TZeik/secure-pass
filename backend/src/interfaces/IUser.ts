import { Document } from 'mongoose';

export interface IUser extends Document {
  nombre: string;
  email: string;
  password: string;
  role: 'residente' | 'guardia';
  apartamento?: string;
  torre?: string;
  fechaRegistro: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}