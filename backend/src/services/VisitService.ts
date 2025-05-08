import { Visit } from "../models/Visit";
import { IVisit, IVisitInput, VisitState } from "../interfaces/IVisit";
import { Types } from "mongoose";
import { UserService } from "./UserService";

export class VisitService {
  static async createVisit(visitData: IVisitInput): Promise<IVisit> {
    // Verificar que el residente existe y es residente
    const resident = await UserService.findById(visitData.authorization.resident);
    if (!resident || resident.role !== 'residente') {
      throw new Error("Residente no válido");
    }

    // Crear la visita con estado inicial
    const visit = await Visit.create({
      ...visitData,
      qrId: this.generateQRId(),
      'authorization.state': VisitState.PENDING,
      'authorization.date': new Date()
    });

    return visit.populate('authorization.resident', 'name apartment');
  }

  static async updateVisit(
    visitId: string | Types.ObjectId,
    updateData: Partial<IVisitInput>
  ): Promise<IVisit | null> {
    // Validar guardia si se está actualizando
    if (updateData.registry?.entry?.guard) {
      const guard = await UserService.findById(updateData.registry.entry.guard);
      if (!guard || guard.role !== 'guardia') {
        throw new Error("Guardia no válido");
      }
    }

    return await Visit.findByIdAndUpdate(
      visitId,
      updateData,
      { new: true, runValidators: true }
    ).populate('authorization.resident', 'name apartment');
  }

  static async registerEntry(
    qrId: string,
    guardId: Types.ObjectId,
    note?: string
  ): Promise<IVisit | null> {
    const visit = await Visit.findOne({ qrId });
    if (!visit) throw new Error("Visita no encontrada");

    // Verificar que el guardia existe
    const guard = await UserService.findById(guardId);
    if (!guard || guard.role !== 'guardia') {
      throw new Error("Guardia no válido");
    }

    return await Visit.findByIdAndUpdate(
      visit._id,
      {
        'registry.entry': {
          guard: guardId,
          date: new Date(),
          note
        },
        'authorization.state': VisitState.APPROVED
      },
      { new: true }
    ).populate('authorization.resident', 'name apartment');
  }

  static async registerExit(
    qrId: string,
    guardId: Types.ObjectId,
    note?: string
  ): Promise<IVisit | null> {
    const visit = await Visit.findOne({ qrId });
    if (!visit) throw new Error("Visita no encontrada");
    if (visit.authorization.state !== VisitState.APPROVED) {
      throw new Error("La visita no está aprobada para registrar salida");
    }

    // Verificar que el guardia existe
    const guard = await UserService.findById(guardId);
    if (!guard || guard.role !== 'guardia') {
      throw new Error("Guardia no válido");
    }

    return await Visit.findByIdAndUpdate(
      visit._id,
      {
        'registry.exit': {
          guard: guardId,
          date: new Date(),
          note
        },
        'authorization.state': VisitState.COMPLETE
      },
      { new: true }
    ).populate('authorization.resident', 'name apartment');
  }

  static async getVisitsByResident(
    residentId: string | Types.ObjectId
  ): Promise<IVisit[]> {
    return await Visit.find({ 'authorization.resident': residentId })
      .sort({ 'authorization.date': -1 })
      .populate('authorization.resident', 'name apartment');
  }

  static async getVisitsByGuard(
    guardId: string | Types.ObjectId
  ): Promise<IVisit[]> {
    return await Visit.find({ 'registry.entry.guard': guardId, 'registry.exit.guard': guardId })
      .sort({ 'registry.entry.date': -1 })
      .populate('authorization.resident', 'name apartment');
  }

  static async deleteVisit(visitId: string | Types.ObjectId): Promise<void> {
    await Visit.findByIdAndDelete(visitId);
  }

  static async getAllVisits(): Promise<IVisit[]> {
    return await Visit.find()
      .populate('authorization.resident', 'name apartment')
      .populate('registry.entry.guard', 'name')
      .populate('registry.exit.guard', 'name')
      .sort({ 'authorization.date': -1 });
  }
  
  static async getVisitById(visitId: string | Types.ObjectId): Promise<IVisit | null> {
    return await Visit.findById(visitId)
      .populate('authorization.resident', 'name apartment')
      .populate('registry.entry.guard', 'name')
      .populate('registry.exit.guard', 'name');
  }
  
  static async getVisitByQR(qrId: string): Promise<IVisit | null> {
    return await Visit.findOne({ qrId })
      .populate('authorization.resident', 'name apartment')
      .populate('registry.entry.guard', 'name')
      .populate('registry.exit.guard', 'name');
  }

  static async expirePendingVisits(): Promise<number> {
    const result = await Visit.updateMany(
      {
        'authorization.state': VisitState.PENDING,
        'authorization.exp': { $lt: new Date() }
      },
      {
        'authorization.state': VisitState.EXPIRED
      }
    );
    return result.modifiedCount;
  }

  private static generateQRId(): string {
    return `qr-${Math.random().toString(36).substring(2, 10)}-${Date.now()}`;
  }
}