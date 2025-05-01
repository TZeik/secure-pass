import mongoose, { Schema, Model } from 'mongoose';
import { IVisit } from '../interfaces/IVisit';

const visitSchema: Schema = new mongoose.Schema({
  residente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  guardia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nombreVisitante: {
    type: String,
    required: true
  },
  documentoVisitante: {
    type: String,
    required: true
  },
  imagenUrl: {
    type: String,
  },
  fechaAutorizacion: {
    type: Date,
    default: Date.now
  },
  fechaEntrada: {
    type: Date
  },
  fechaSalida: {
    type: Date
  },
  qrId: {
    type: String,
    unique: true
  },
  estado: {
    type: String,
    enum: ['autorizado', 'procesando', 'finalizado'],
    default: 'autorizado'
  },
  motivo: {
    type: String,
    required: true
  }
});

visitSchema.index({ qrId: 1 }, { unique: true });
visitSchema.index({ documentoVisitante: 1 });
visitSchema.index({ fechaEntrada: 1 });
visitSchema.index({ estado: 1 });

visitSchema.path('documentoVisitante').validate(function (value: string) {
    return value && value.length >= 5;
}, 'El documento debe tener al menos 5 caracteres');

export const Visit: Model<IVisit> = mongoose.model<IVisit>('Visit', visitSchema);
export default Visit;