"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('EMAIL_HOST'),
            port: parseInt(this.configService.get('EMAIL_PORT'), 10),
            secure: this.configService.get('EMAIL_SECURE') === 'true',
            auth: {
                user: this.configService.get('EMAIL_USER'),
                pass: this.configService.get('EMAIL_PASSWORD'),
            },
        });
    }
    async sendToken(email, token) {
        try {
            const mailOptions = {
                from: this.configService.get('EMAIL_FROM'),
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
        }
        catch (error) {
            console.error('Error al enviar correo (Verifique EMAIL_PASSWORD):', error);
            throw new common_1.InternalServerErrorException('Fallo al enviar el correo de verificación. Verifique las credenciales del servidor de correo.');
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map