import { Document, Schema } from 'mongoose';

export interface IVehicle extends Document {
  residente: string;
  placa: string;
  marca: string;
  modelo: string;
  color: string;
  imagenUrl?: string; // URL de Cloudinary
  fechaRegistro: Date;
}