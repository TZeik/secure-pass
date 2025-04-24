
import mongoose from 'mongoose';
import { env } from '../config/env';
import { User } from '../models/User';
import { Visit } from '../models/Visit';
import { Vehicle } from '../models/Vehicle';


beforeAll(async () => {
  await mongoose.connect(env.MONGODB_URI);
  await User.deleteMany({});
  await Visit.deleteMany({});
  await Vehicle.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});