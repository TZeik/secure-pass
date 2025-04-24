import { User } from '../models/User';
import mongoose from 'mongoose';
import { env } from '../config/env';

async function runUserTests() {
  await mongoose.connect(env.MONGODB_URI);

    // Usuario de prueba
  const resident = await User.create({
    nombre: 'Randy Germosén',
    email: 'randy@me.com',
    password: 'password123',
    role: 'residente',
    apartamento: '201',
    torre: 'B'
  });
  console.log('Usuario creado:', resident);

  // Busqueda de usuario
  const foundUser = await User.findOne({ email: 'randy@me.com' });
  console.log('Usuario encontrado:', foundUser);

  await mongoose.connection.close();
}

runUserTests().catch(console.error);