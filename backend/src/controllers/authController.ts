import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../services/UserService";
import { IUser, IUserInput, UserRole } from "../interfaces/IUser";

const jwtSecret = process.env.JWT_SECRET || '';

interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const authController = {
  async registerUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { nombre, email, password, role, apartamento, torre, imagenUrl } = req.body;

    try {
      if (role === UserRole.RESIDENTE && (!apartamento || !torre)) {
        res.status(400).json({ 
          error: "Apartamento y torre son requeridos para residentes" 
        });
        return;
      }

      const userData: IUserInput = {
        nombre,
        email,
        password,
        role,
        apartamento,
        torre,
        imagenUrl
      };

      const user = await UserService.createUser(userData);
      
      const userResponse = {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        role: user.role,
        apartamento: user.apartamento,
        torre: user.torre,
        imagenUrl: user.imagenUrl,
        fechaRegistro: user.fechaRegistro
      };

      res.status(201).json({ 
        message: "Usuario registrado exitosamente",
        user: userResponse 
      });
    } catch (error: any) {
      if (error.message.includes("duplicate key")) {
        res.status(400).json({ error: "El email ya está registrado" });
      } else {
        res.status(500).json({ error: error.message || "Error al registrar el usuario" });
      }
    }
  },

  async loginUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
      const user = await UserService.findByEmail(email);
      if (!user) {
        res.status(401).json({ error: "Credenciales inválidas" });
        return;
      }

      const isPasswordValid = await UserService.comparePasswords(user._id, password);
      if (!isPasswordValid) {
        res.status(401).json({ error: "Credenciales inválidas" });
        return;
      }

      const token = jwt.sign(
        { 
          id: user._id, 
          role: user.role,
          email: user.email
        }, 
        jwtSecret,
        { expiresIn: "1h" }
      );

      const userResponse = {
        _id: user._id,
        nombre: user.nombre,
        email: user.email,
        role: user.role,
        apartamento: user.apartamento,
        torre: user.torre,
        imagenUrl: user.imagenUrl
      };

      res.status(200).json({ 
        token,
        user: userResponse,
        expiresIn: 3600
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Error al iniciar sesión" });
    }
  },

  async getCurrentUser(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(404).json({ error: "Usuario no encontrado" });
        return;
      }
  
      const userResponse = {
        _id: req.user._id,
        nombre: req.user.nombre,
        email: req.user.email,
        role: req.user.role,
        apartamento: req.user.apartamento,
        torre: req.user.torre,
        imagenUrl: req.user.imagenUrl,
        fechaRegistro: req.user.fechaRegistro
      };
  
      res.status(200).json(userResponse);
    } catch (error: any) {
      res.status(500).json({ error: error.message || "Error al obtener el usuario" });
    }
  }
};