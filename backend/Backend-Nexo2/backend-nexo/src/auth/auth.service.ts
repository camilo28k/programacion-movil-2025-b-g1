import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { VerifyTokenDto } from './dto/verify-token.dto';
import { CreateAuthDto } from './dto/create-auth.dto'; // Asegúrate de que el DTO sea el correcto
import { UserStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/shared/email/email.service';

@Injectable()
export class AuthService {
  // Inyección de dependencias
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  // =================================================================
  // HELPER: Generador de Token (Privado del servicio)
  // =================================================================
  private generateToken(): string {
    // Genera un código aleatorio de 6 dígitos
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // =================================================================
  // MÉTODO 1: registerAndSendToken (Crea cuenta en PENDING y envía token)
  // RUTA: POST /auth/register
  // =================================================================
  async registerAndSendToken(createAuthDto: CreateAuthDto) {
    // 1. Hashing de Contraseña
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    const token = this.generateToken();

    // 2. Validaciones y obtención de Role ID
    const role = await this.prisma.role.findUnique({ where: { name: createAuthDto.name_rol } });
    
    if (!role) {
      throw new BadRequestException(`El rol '${createAuthDto.name_rol}' no es válido o no existe.`);
    }

    // 3. Transacción Atómica: Crea Person, UserAccount y VerificationToken
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        // a) Insertar en PERSON
        const person = await tx.person.create({
          data: {
            first_names: createAuthDto.first_names,
            last_names: createAuthDto.last_names,
            email: createAuthDto.email,
            phone: createAuthDto.phone,
          },
        });

        // b) Insertar en USER_ACCOUNT (CLAVE: status: PENDING)
        const userAccount = await tx.userAccount.create({
          data: {
            username: createAuthDto.username,
            password_hash: hashedPassword,
            role_id: role.id,
            person_id: person.id,
            status: UserStatus.PENDING, // Estado inicial
          },
        });

        // C) LÓGICA DE COMPANY ELIMINADA AQUÍ

        // d) Insertar el TOKEN
        await tx.verificationToken.create({
          data: {
            token: token,
            user_account_id: userAccount.id,
            expires_at: new Date(Date.now() + 3600000), // Válido por 1 hora
          },
        });
        
        return { userAccount };
      });
      
      // 4. Envío de Correo (Fuera de la transacción de DB)
      await this.emailService.sendToken(createAuthDto.email, token);

      return { 
        message: `Registro exitoso. Se ha enviado el token de activación a ${createAuthDto.email}.`,
        username: result.userAccount.username
      };

    } catch (error) {
      // Manejo de errores de unicidad (P2002) para email o username
      if (error.code === 'P2002') {
        throw new BadRequestException('El nombre de usuario o correo electrónico ya está registrado.');
      }
      throw new InternalServerErrorException('Error interno al registrar la cuenta.');
    }
  }

  // =================================================================
  // MÉTODO 2: activateAccount (Verifica token y actualiza a ACTIVE)
  // RUTA: POST /auth/confirm-token
  // =================================================================
  async activateAccount(verifyTokenDto: VerifyTokenDto) {
    const { username, token } = verifyTokenDto;

    // 1. Buscar la cuenta y verificar la COINCIDENCIA del token
    const user = await this.prisma.userAccount.findUnique({
      where: { username },
      include: { 
        verificationToken: {
          where: { token: token, expires_at: { gt: new Date() } } 
        }
      },
    });

    // 2. Validación de existencia y coincidencia 
    if (!user || !user.verificationToken) { 
        throw new BadRequestException('Token inválido o expirado. Verifique el código ingresado.');
    }

    // 2.1 Validación de estado
    if (user.status === UserStatus.ACTIVE) {
        throw new BadRequestException('La cuenta ya está activa.');
    }
    
    const verificationToken = user.verificationToken;
    
    // 3. Transacción: Activar cuenta y eliminar token
    await this.prisma.$transaction(async (tx) => {
      // a) Actualizar estado a 'active'
      await tx.userAccount.update({
        where: { id: user.id },
        data: { status: UserStatus.ACTIVE },
      });
      
      // b) Eliminar el token usado para limpieza
      await tx.verificationToken.delete({
        where: { id: verificationToken.id },
      });
    });

    // 4. Retorno: Indicación para que el frontend redirija a Login (HU02)
    return { 
      message: 'Cuenta activada con éxito.',
      redirectTo: '/auth/login'
    };
  }
}