import { User } from "../models/User";
import { Visit } from "../models/Visit";
import mongoose from "mongoose";
import { env } from "../config/env";
import { Vehicle } from "../models/Vehicle";

async function deleteDataTests() {
  await mongoose.connect(env.MONGODB_URI);

  // eliminacion de datos de prueba
  await User.deleteMany({});
  await Visit.deleteMany({});
  await Vehicle.deleteMany({});

  console.log("¡Se han eliminado los sujetos de prueba!");

  await mongoose.connection.close();

}

deleteDataTests().catch(console.error);
