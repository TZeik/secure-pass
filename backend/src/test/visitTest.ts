import { User } from '../models/User';
import { Visit } from '../models/Visit';
import mongoose from 'mongoose';
import { env } from '../config/env';
import { UserRole } from '../interfaces/IUser';

async function runVisitTests() {
  await mongoose.connect(env.MONGODB_URI);

  // Crear un residente para asociar la visita
  const resident = await User.create({
    nombre: 'Carlos López',
    email: 'carlos@example.com',
    password: 'password123',
    role: UserRole.RESIDENTE,
    apartamento: '301',
    torre: 'C'
  });

  // Crear una visita
  const visit = await Visit.create({
    residente: resident._id,
    nombreVisitante: 'Ana Martínez',
    documentoVisitante: 'V-98765432',
    qrId: 'qr-123456',
    motivo: 'Entrega de paquete'
  });
  console.log('Visita creada:', visit);

  const foundVisit = await Visit.findOne({ nombreVisitante: 'Ana Martínez' });
  console.log('Visita encontrada:', foundVisit);

  await mongoose.connection.close();
}

runVisitTests().catch(console.error);