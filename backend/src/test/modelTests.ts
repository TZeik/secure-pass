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
    password: "password",
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
    qrId: "qr-unique-id-123",
  });
  console.log("Visita creada:", visit);

  // consulta a las visitas del residente
  const visits = await Visit.find({ residente: resident._id });
  console.log("Visitas encontradas:", visits);

  // eliminacion de datos de prueba
  await User.deleteMany({ email: "juan@example.com" });
  await Visit.deleteMany({ qrId: "qr-unique-id-123" });

  await mongoose.connection.close();
}

runTests().catch(console.error);
