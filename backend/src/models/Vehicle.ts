import { Schema, model } from "mongoose";
import { IVehicle } from "../interfaces/IVehicle";

const vehicleSchema = new Schema<IVehicle>({
  residente: {
    type: String,
    ref: "User",
    required: true,
    validate: {
      validator: async (id: string) => {
        const user = await model('User').findById(id);
        return user?.role === 'residente';
      },
      message: 'El residente no existe o no tiene el rol correcto'
    }
  },
  placa: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    match: [/^[A-Z]{1}-\d{6}$/, 'Formato de placa inválido (A-123456)']
  },
  marca: {
    type: String,
    required: true,
  },
  modelo: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  imagenUrl: {
    type: String,
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
});

export const Vehicle = model<IVehicle>("Vehicle", vehicleSchema);
