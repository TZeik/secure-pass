import { User } from "../models/User";
import { Visit } from "../models/Visit";
import mongoose from "mongoose";
import { env } from "../config/env";

async function runTests() {
  await mongoose.connect(env.MONGODB_URI);

  // eliminacion de datos de prueba
  await User.deleteMany({ email: "juan@example.com" });
  await Visit.deleteMany({ qrId: "qr-unique-id-123" });

  await mongoose.connection.close();

}

runTests().catch(console.error);
