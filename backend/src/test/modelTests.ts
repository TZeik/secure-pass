import { User } from "../models/User";
import { Visit } from "../models/Visit";
import mongoose from "mongoose";
import { env } from "../config/env";

async function runTests() {
  await mongoose.connect(env.MONGODB_URI);

  // usuario residente de prueba
  const resident = await User.create({
    nombre: "Juan Pérez",
    email: "juan@example.com",
    password: "password123",
    role: "residente",
    apartamento: "101",
    torre: "A",
  });
  console.log("Usuario creado:", resident);

  // visita asociada de prueba
  const visit = await Visit.create({
    residente: resident._id,
    nombreVisitante: "María García",
    documentoVisitante: "V-12345678",
    motivo: "Entrega de paquete",
    qrId: "qr-123456",
  });
  console.log("Visita creada:", visit);

  console.log("ID de Residente: ", resident._id);
  console.log("ID de Visitante: ", visit._id);

  // consulta a las visitas del residente
  const visits = await Visit.find({ residente: resident._id });
  console.log("Visitas encontradas:", visits);


  await mongoose.connection.close();
}

runTests().catch(console.error);
