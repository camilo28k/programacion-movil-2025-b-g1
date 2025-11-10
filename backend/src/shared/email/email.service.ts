import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: parseInt(this.configService.get<string>('EMAIL_PORT'), 10),
      secure: this.configService.get<string>('EMAIL_SECURE') === 'true',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }

  async sendToken(email: string, token: string): Promise<void> {
    try {
      const mailOptions = {
        from: this.configService.get<string>('EMAIL_FROM'),
        to: email,
        subject: 'Código de Activación de Cuenta de Nexo',
        html: `
          <h1>¡Bienvenido a Nexo Innovación!</h1>
          <p>Para activar tu cuenta, utiliza el siguiente código:</p>
          <h2 style="color: #007bff;"><b>${token}</b></h2>
          <p>Este código es válido por 1 minuto.</p>
        `,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`✉️ Correo enviado a ${email}: ID del mensaje: ${info.messageId}`);
    } catch (error) {
      console.error('Error al enviar correo (Verifique EMAIL_PASSWORD):', error);
      throw new InternalServerErrorException(
        'Fallo al enviar el correo de verificación. Verifique las credenciales del servidor de correo.',
      );
    }
  }
}
