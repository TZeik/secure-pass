import dotenv from 'dotenv';
dotenv.config();

// aqui valido variables no cargadas

const checkEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`La variable ${key} no está definida en .env`);
  return value;
};

export const env = {
  MONGODB_URI: checkEnv('MONGODB_URI'),
  PORT: process.env.PORT || '5000',
  JWT_SECRET: checkEnv('JWT_SECRET'),
  EMAIL_USER: checkEnv('EMAIL_USER'),
  EMAIL_PASSWORD: checkEnv('EMAIL_PASSWORD'),
  EMAIL_FROM: checkEnv('EMAIL_FROM'),
  EMAIL_SENDER: checkEnv('EMAIL_SENDER'),
  EMAIL_REPLY: checkEnv('EMAIL_REPLY'),
};