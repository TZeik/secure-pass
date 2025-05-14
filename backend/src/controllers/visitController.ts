import { Request, Response, NextFunction } from "express";
import { VisitService } from "../services/VisitService";
import { IVisit, IVisitInput, VisitState } from "../interfaces/IVisit";
import { Types } from "mongoose";
import { notificationService } from "../services/NotificationService";
import { UserService } from "../services/UserService";
import { IUser } from "../interfaces/IUser";
import { ReportService } from "../services/ReportService";

export const visitController = {
  async authorizeVisit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const {
      name,
      email,
      document,
      visitImage,
      vehicleImage,
      resident,
      reason,
    } = req.body;
    try {
      const visitData = {
        visit: { name, email, document, visitImage, vehicleImage },
        authorization: { resident, reason },
      } as IVisitInput;

      const newVisit = await VisitService.createVisit(visitData);
      res
        .status(201)
        .json({ message: "Visita registrada con éxito", data: newVisit });
    } catch (error) {
      console.error("Error registrando entrada:", error);
      next(error);
    }
  },

  async registerEntry(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { qrId, guardId, note } = req.body;
      const { status } = req.query;
      const visit = await VisitService.registerEntry(
        qrId as string,
        guardId as Types.ObjectId,
        status as VisitState,
        note
      );
      if (!visit) {
        res.status(404).json({ message: "Visita no encontrada" });
        return;
      }
      res
        .status(200)
        .json({ message: "Entrada registrada con éxito", data: visit });
    } catch (error) {
      console.error("Error registrando entrada:", error);
      next(error);
    }
  },

  async registerExit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { qrId, guardId, note } = req.body;
      const visit = await VisitService.registerExit(
        qrId as string,
        guardId as Types.ObjectId,
        note
      );
      if (!visit) {
        res.status(404).json({ message: "Visita no encontrada" });
        return;
      }
      res
        .status(200)
        .json({ message: "Salida registrada con éxito", data: visit });
    } catch (error) {
      console.error("Error registrando salida:", error);
      next(error);
    }
  },

  async getAllVisits(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const visits = await VisitService.getAllVisits();

      res.status(200).json(visits);
    } catch (error) {
      next(error);
    }
  },

  async getVisitById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const visit = await VisitService.getVisitById(id);

      if (!visit) {
        res.status(404).json({ message: "Visita no encontrada" });
        return;
      }
      res.status(200).json(visit);
    } catch (error) {
      next(error);
    }
  },

  async getVisitByQR(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { qrId } = req.params;
      const visit = await VisitService.getVisitByQR(qrId);

      if (!visit) {
        res.status(404).json({ message: "Visita no encontrada" });
        return;
      }
      res.status(200).json(visit);
    } catch (error) {
      next(error);
    }
  },

  async updateVisitStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.query;

      const updatedVisit = await VisitService.updateVisitStatus(
        id,
        status as VisitState
      );

      if (!updatedVisit) {
        res.status(404).json({ message: "Visita no encontrada" });
        return;
      }

      res
        .status(200)
        .json({ message: "Estado actualizado", data: updatedVisit });
    } catch (error) {
      next(error);
    }
  },

  async deleteVisit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      await VisitService.deleteVisit(id);
      res.status(200).json({ message: "Visita eliminada con éxito" });
    } catch (error) {
      next(error);
    }
  },

  async getVisitsByResident(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { residentId } = req.params;
      const visits = await VisitService.getVisitsByResident(residentId);
      res.status(200).json(visits);
    } catch (error) {
      next(error);
    }
  },

  async getVisitsByGuard(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { guardId } = req.params;
      const visits = await VisitService.getVisitsByGuard(guardId);
      res.status(200).json(visits);
    } catch (error) {
      next(error);
    }
  },

  async notifyVisit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const visit = (await VisitService.getVisitById(id)) as IVisit;
      const resident = (await UserService.findById(
        visit.authorization.resident
      )) as IUser;
      const notification = await notificationService.sendVisitNotification(
        resident.auth.email,
        visit.visit.email,
        visit
      );
      res.status(201).json(notification);
    } catch (error) {
      next(error);
    }
  },

   async generateReport(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { start, end, resident, guard } = req.query;
      const startDate = new Date(start as string);
      const endDate = end ? new Date(end as string) : undefined;

      const myResident = resident ? await UserService.findById(resident as string) : null;
      const myGuard = guard ? await UserService.findById(guard as string) : null;

      const report = await ReportService.generateReport(
        startDate, 
        endDate, 
        myResident, 
        myGuard
      );
      
      res.status(200).json(report);
    } catch (error) {
      next(error);
    }
  },
};
