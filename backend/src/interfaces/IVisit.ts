import { Document } from 'mongoose';

export interface IVisit extends Document {
  residente: string;
  nombreVisitante: string;
  documentoVisitante: string;
  fechaAutorizacion: Date;
  fechaEntrada?: Date;
  fechaSalida?: Date;
  qrId?: string;
  estado: 'autorizado' | 'procesando' | 'finalizado';
  motivo: string;
}