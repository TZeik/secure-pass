import { Schema, model } from "mongoose";
import { IVehicle } from "../interfaces/IVehicle";

const vehicleSchema = new Schema<IVehicle>({
  residente: {
    type: String,
    ref: "User",
    required: true,
  },
  placa: {
    type: String,
    required: true,
    unique: true,
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
