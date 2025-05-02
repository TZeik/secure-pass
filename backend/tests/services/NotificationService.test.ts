import { notificationService } from "../../src/services/NotificationService";
import { VisitService } from "../../src/services/VisitService";
import { UserService } from "../../src/services/UserService";
import { UserRole } from "../../src/interfaces/IUser";
import { IVisit } from "../../src/interfaces/IVisit";
import { Types } from "mongoose";
import nodemailer from "nodemailer";
import { User } from "../../src/models/User";
import Visit from "../../src/models/Visit";

describe("NotificationService", () => {
  let residentId: Types.ObjectId;
  let guardiaId: Types.ObjectId;
    
  // Configuracion de prueba de transporter mock
  const mockSendMail = jest
    .fn()
    .mockResolvedValue({ messageId: "test-message-id" });

  const mockTransporter: nodemailer.Transporter = {
    sendMail: mockSendMail,
  } as unknown as nodemailer.Transporter;

  // Configuracion de prueba de transporter real
  const testTransporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    }
  });


  beforeEach(async () => {
    jest.clearAllMocks();
    await User.deleteMany({});
    await Visit.deleteMany({});
  });

  it("Enviar una notificación de entrada a mock (prueba)", async () => {

    notificationService.transporter = mockTransporter;

    // Usuario residente de prueba
    const resident = await UserService.createUser({
      nombre: "Gauris Javier",
      email: "gauris@example.com",
      password: "password123",
      role: UserRole.RESIDENTE,
      apartamento: "7",
      torre: "A",
    });

    residentId = resident._id as Types.ObjectId;

    // Usuario guardia de prueba
    const guardia = await UserService.createUser({
      nombre: "Ernesto Papotico",
      email: "ernesto@example.com",
      password: "password123",
      role: UserRole.GUARDIA,
    });

    guardiaId = guardia._id as Types.ObjectId;

    const visit = await VisitService.createVisit({
      residente: residentId,
      guardia: guardiaId,
      nombreVisitante: "Rafael Tejada",
      documentoVisitante: "V-12345678",
      motivo: "Entrega de paquete",
    });

    const updatedVisit = (await VisitService.registerEntry(
      visit._id as Types.ObjectId
    )) as IVisit;

    const entryData = {
      to: "alexgermosen@gmail.com",
      visitData: {
        nombreVisitante: updatedVisit.nombreVisitante,
        documento: updatedVisit.documentoVisitante,
        motivo: updatedVisit.motivo,
        qrId: updatedVisit.qrId as string,
        tipo: "entrada" as const,
        fecha: updatedVisit.fechaEntrada as Date,
      },
    };


    // Envio en mock de prueba
    await notificationService.sendVisitNotification(
      entryData.to,
      entryData.visitData
    );    

    expect(mockSendMail).toHaveBeenCalled();

    const sentMailOptions = mockSendMail.mock.calls[0][0];
    expect(sentMailOptions.to).toBe(entryData.to);
    expect(sentMailOptions.subject).toContain("entrada");
  });

  it("Enviar una notificación de entrada a gmail (real)", async () => {

    notificationService.transporter = testTransporter;

    // Usuario residente de prueba
    const resident = await UserService.createUser({
      nombre: "Gauris Javier",
      email: "gauris@example.com",
      password: "password123",
      role: UserRole.RESIDENTE,
      apartamento: "7",
      torre: "A",
    });

    residentId = resident._id as Types.ObjectId;

    // Usuario guardia de prueba
    const guardia = await UserService.createUser({
      nombre: "Ernesto Papotico",
      email: "ernesto@example.com",
      password: "password123",
      role: UserRole.GUARDIA,
    });

    guardiaId = guardia._id as Types.ObjectId;

    const visit = await VisitService.createVisit({
      residente: residentId,
      guardia: guardiaId,
      nombreVisitante: "Rafael Tejada",
      documentoVisitante: "V-12345678",
      motivo: "Entrega de paquete",
    });

    const updatedVisit = (await VisitService.registerEntry(
      visit._id as Types.ObjectId
    )) as IVisit;

    const entryData = {
      to: process.env.EMAIL_USER as string,
      visitData: {
        nombreVisitante: updatedVisit.nombreVisitante,
        documento: updatedVisit.documentoVisitante,
        motivo: updatedVisit.motivo,
        qrId: updatedVisit.qrId as string,
        tipo: "entrada" as const,
        fecha: updatedVisit.fechaEntrada as Date,
      },
    };

    // Envio al email
    const result = await notificationService.sendVisitNotification(
      entryData.to,
      entryData.visitData
    );    

    // Verificaciones
    expect(result).toBeDefined();
    expect(result.messageId).toBeTruthy();
    expect(result.messageId).toMatch(/^<[^>]+@[^>]+>$/);

  });
});
