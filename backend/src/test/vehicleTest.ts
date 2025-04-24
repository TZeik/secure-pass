import { User } from '../models/User';
import { Vehicle } from '../models/Vehicle';
import mongoose from 'mongoose';
import { env } from '../config/env';

async function runVehicleTests() {
  await mongoose.connect(env.MONGODB_URI);

  // Crear un residente para asociar el vehículo
  const resident = await User.create({
    nombre: 'Luisa Fernández',
    email: 'luisa@example.com',
    password: 'password123',
    role: 'residente',
    apartamento: '401',
    torre: 'D'
  });

  // Crear un vehículo
  const vehicle = await Vehicle.create({
    residente: resident._id,
    placa: 'ABC-123',
    marca: 'Honda',
    modelo: 'Civic',
    color: 'Rojo',
    imagenUrl: 'https://es.automobiles.honda.com/civic-sedan'
  });
  console.log('Vehículo creado:', vehicle);

  const foundVehicle = await Vehicle.findOne({ placa: 'ABC-123' });
  
  console.log("Vehiculo encontrado: ", foundVehicle);
  if(foundVehicle){
    const foundResident = await User.findOne({ _id: foundVehicle.residente });
    console.log("Datos del residente al que pertenece el vehículo:", foundResident);
  }
  await mongoose.connection.close();
}

runVehicleTests().catch(console.error);