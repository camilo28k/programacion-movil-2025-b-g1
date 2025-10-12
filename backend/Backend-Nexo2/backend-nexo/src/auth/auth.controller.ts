import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { VerifyTokenDto } from './dto/verify-token.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

// La ruta base para este controlador es 'auth'
@Controller('auth')
export class AuthController {
  
    // Inyección de dependencias del servicio de lógica de negocio
    constructor(private readonly authService: AuthService) {}

    // 1. ENDPOINT: REGISTRO INICIAL
    // Ruta: POST /auth/register
    // Propósito: Recibe los datos del formulario de registro.
    @Post('register')
    @HttpCode(201) // 201 Created: El estándar REST para la creación exitosa de un nuevo recurso.
    async register(@Body() registerDto: CreateAuthDto) {
        // La validación del DTO (incluida la del dominio @corhuila.edu.co) se ejecuta 
        // automáticamente antes de que se llame a esta función.
        
        // Delega la creación de la cuenta (en PENDING) y el envío del token al servicio.
        return this.authService.registerAndSendToken(registerDto);
    }

    // 2. ENDPOINT: CONFIRMACIÓN DE TOKEN Y ACTIVACIÓN
    // Ruta: POST /auth/confirm-token
    // Propósito: Recibe el código de 6 dígitos que el usuario introduce.
    @Post('confirm-token')
    @HttpCode(200) // 200 OK: El estándar REST para una actualización/modificación exitosa de un recurso existente.
    async confirmToken(@Body() verifyTokenDto: VerifyTokenDto) {
        // Delega la verificación del token y la actualización del estado de la cuenta a 'ACTIVE'.
        return this.authService.activateAccount(verifyTokenDto);
    }
}