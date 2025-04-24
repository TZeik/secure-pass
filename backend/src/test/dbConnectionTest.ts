import mongoose from 'mongoose';
import { env } from '../config/env';

async function testConnection() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('Conexión a MongoDB Atlas exitosa');
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error de conexión:', error);
    process.exit(1);
  }
}

testConnection();