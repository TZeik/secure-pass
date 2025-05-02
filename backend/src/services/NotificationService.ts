import nodemailer from 'nodemailer';
import { env } from '../config/env';

class NotificationService {
    public transporter;

    constructor() {
      this.transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: env.EMAIL_USER,
          pass: env.EMAIL_PASSWORD,
        },
      });
    }

  async sendVisitNotification(
    to: string,
    visitData: {
      nombreVisitante: string;
      documento: string;
      motivo: string;
      qrId: string;
      tipo: 'entrada' | 'salida';
      fecha: Date;
    }
  ): Promise<nodemailer.SentMessageInfo> {
    const { nombreVisitante, documento, motivo, qrId, tipo, fecha } = visitData;

    const mailOptions = {
      from: `${process.env.EMAIL_FROM}`,
      sender: process.env.EMAIL_SENDER,
      replyTo: process.env.EMAIL_REPLY,
      to,
      subject: `Registro de ${tipo} de visitante`,
      html: `
        <h1>Notificación de ${tipo}</h1>
        <p><strong>Visitante:</strong> ${nombreVisitante}</p>
        <p><strong>Documento:</strong> ${documento}</p>
        <p><strong>Motivo:</strong> ${motivo}</p>
        <p><strong>Fecha:</strong> ${fecha.toLocaleString()}</p>
        <p><strong>Código QR:</strong> ${qrId}</p>
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrId}" alt="QR"/>
        <p><small>Este es un mensaje automático, no responda.</small></p>
      `,
    };

    return await this.transporter.sendMail(mailOptions);
  }

}

export const notificationService = new NotificationService();