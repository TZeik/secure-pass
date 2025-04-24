import { Document, Schema } from 'mongoose';

export interface IVehicleInput{
  residente: string;
  placa: string;
  marca: string;
  modelo: string;
  color: string;
  imagenUrl?: string; // URL de Cloudinary
}

export interface IVehicle extends IVehicleInput, Document{
  fechaRegistro: Date;
}