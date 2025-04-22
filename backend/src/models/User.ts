import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/IUser';

const userSchema: Schema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['residente', 'guardia'],
      required: true
    },
    apartamento: {
      type: String,
      required: function(this: IUser) { return this.role === 'residente'; }
    },
    torre: {
      type: String,
      required: function(this: IUser) { return this.role === 'residente'; }
    },
    fechaRegistro: {
      type: Date,
      default: Date.now
    }
  });
  
  userSchema.pre<IUser>('save', async function(next) {
    if (!this.isModified('password')) return next();
    
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  

  // comparacion de contraseñas
  userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  };
  
  export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);