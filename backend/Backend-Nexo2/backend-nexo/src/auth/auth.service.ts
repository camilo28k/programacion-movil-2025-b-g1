import { Injectable, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { VerifyTokenDto } from './dto/verify-token.dto';
import { CreateAuthDto } from './dto/create-auth.dto'; // Asegúrate de que el DTO sea el correcto
import { UserStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/shared/email/email.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  // Inyección de dependencias
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) { }

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
            expires_at: new Date(Date.now() + 60000), // Válido por 1 minuto
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
  // HU01: ACTIVACIÓN DE CUENTA (Usando Email)
  // =================================================================
  async activateAccount(verifyTokenDto: VerifyTokenDto) {
    const { email, token } = verifyTokenDto; // <-- Usamos email

    // 1. Buscar la persona por email y luego su UserAccount y VerificationToken
    const personWithAccount = await this.prisma.person.findUnique({
      where: { email }, // <-- Buscamos por email
      include: {
        userAccount: {
          include: { verificationToken: true }
        }
      },
    });

    const user = personWithAccount?.userAccount;

    // Validar existencia de la cuenta y token
    if (!user || !user.verificationToken) {
      throw new BadRequestException('Cuenta no encontrada o token inválido/expirado.');
    }

    // 2. Verificar que el token coincida
    if (user.verificationToken.token !== token) {
      throw new UnauthorizedException('El código de activación ingresado es incorrecto.');
    }

    // 🕒 3. Verificar si el token ha expirado
    const now = new Date();
    if (now > user.verificationToken.expires_at) {
      throw new BadRequestException('El token ha expirado. Solicite uno nuevo.');
    }

    // 4. Transacción para activar cuenta
    return this.prisma.$transaction(async (tx) => {
      // Actualizar estado de la cuenta a ACTIVE
      await tx.userAccount.update({
        where: { id: user.id },
        data: { status: UserStatus.ACTIVE },
      });

      // Eliminar el token de verificación
      await tx.verificationToken.delete({
        where: { id: user.verificationToken.id },
      });

      return { message: '¡Cuenta activada exitosamente! Ya puede iniciar sesión.' };
    });
  }

  // =================================================================
  // HU02: LOGIN (Inicio de sesión - Usando Email)
  // =================================================================
  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto; // <-- Usamos email

    // 1. Buscar la persona por email
    const personWithAccount = await this.prisma.person.findUnique({
      where: { email },
      include: {
        userAccount: {
          include: { role: { select: { name: true } } }
        }
      }
    });

    const userAccount = personWithAccount?.userAccount;

    // 2. Validación de credenciales
    if (!personWithAccount || !userAccount || !userAccount.password_hash) {
      throw new UnauthorizedException('Credenciales inválidas (Correo no encontrado).');
    }

    // Comparar contraseña hasheada
    const isPasswordValid = await bcrypt.compare(password, userAccount.password_hash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas (Contraseña incorrecta).');
    }

    // ... (El resto del código de validación de estado es el mismo)

    // 4. Generar Token JWT (Payload)
    const payload = {
      sub: userAccount.id,
      // Usamos el email en el token
      email: personWithAccount.email,
      role: userAccount.role.name,
      // Si el frontend necesita el username, aún puedes incluirlo si está disponible:
      username: userAccount.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: userAccount.id,
        username: userAccount.username,
        role: userAccount.role.name,
        email: personWithAccount.email,
        first_names: personWithAccount.first_names,
      }
    };
  }
  async resendToken(email: string) {
  // 1. Buscar usuario
  const person = await this.prisma.person.findUnique({
    where: { email },
    include: { userAccount: { include: { verificationToken: true } } },
  });

  if (!person || !person.userAccount) {
    throw new BadRequestException('El usuario no existe.');
  }

  const user = person.userAccount;

  // 2. Validar que no esté ya activo
  if (user.status === UserStatus.ACTIVE) {
    throw new BadRequestException('La cuenta ya está activa.');
  }

  // 3. Generar nuevo token
  const newToken = this.generateToken();

  // 4. Actualizar o reemplazar el token anterior
  await this.prisma.verificationToken.upsert({
    where: { user_account_id: user.id },
    update: {
      token: newToken,
      expires_at: new Date(Date.now() + 60000), // 1 minuto
    },
    create: {
      token: newToken,
      user_account_id: user.id,
      expires_at: new Date(Date.now() + 60000),
    },
  });

  // 5. Enviar el correo con el nuevo token
  await this.emailService.sendToken(email, newToken);

  return { message: 'Se ha enviado un nuevo token de activación.' };
}

}
