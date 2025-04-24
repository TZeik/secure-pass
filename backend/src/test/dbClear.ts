import mongoose from "mongoose";
import { Vehicle } from "../models/Vehicle";
import { Visit } from "../models/Visit";
import { env } from "../config/env";
import { User } from "../models/User";


async function clearDataBase(){

    await mongoose.connect(env.MONGODB_URI);

    await User.deleteMany({});
    await Visit.deleteMany({});
    await Vehicle.deleteMany({});

    console.log('Se ha limpiado la base de datos correctamente');

    await mongoose.disconnect();
}

clearDataBase();