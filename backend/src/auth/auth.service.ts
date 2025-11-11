import { Injectable, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { VerifyTokenDto } from './dto/verify-token.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UserStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/shared/email/email.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  private generateToken(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  async registerAndSendToken(createAuthDto: CreateAuthDto) {
    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    const token = this.generateToken();

    const role = await this.prisma.role.findUnique({ where: { name: createAuthDto.name_rol } });
    if (!role) {
      throw new BadRequestException(`El rol '${createAuthDto.name_rol}' no es válido o no existe.`);
    }

    try {
      const result = await this.prisma.$transaction(async (tx) => {
        const person = await tx.person.create({
          data: {
            first_names: createAuthDto.first_names,
            last_names: createAuthDto.last_names,
            email: createAuthDto.email,
            phone: createAuthDto.phone,
          },
        });

        const userAccount = await tx.userAccount.create({
          data: {
            username: createAuthDto.username,
            password_hash: hashedPassword,
            role_id: role.id,
            person_id: person.id,
            status: UserStatus.PENDING,
          },
        });

        await tx.verificationToken.create({
          data: {
            token: token,
            user_account_id: userAccount.id,
            expires_at: new Date(Date.now() + 60000),
          },
        });

        return { userAccount };
      });

      await this.emailService.sendToken(createAuthDto.email, token);

      return {
        message: `Registro exitoso. Se ha enviado el token de activación a ${createAuthDto.email}.`,
        username: result.userAccount.username,
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('El nombre de usuario o correo electrónico ya está registrado.');
      }
      throw new InternalServerErrorException('Error interno al registrar la cuenta.');
    }
  }

  async activateAccount(verifyTokenDto: VerifyTokenDto) {
    const { email, token } = verifyTokenDto;

    const personWithAccount = await this.prisma.person.findUnique({
      where: { email },
      include: {
        userAccount: {
          include: { verificationToken: true },
        },
      },
    });

    const user = personWithAccount?.userAccount;

    if (!user || !user.verificationToken) {
      throw new BadRequestException('Cuenta no encontrada o token inválido/expirado.');
    }

    if (user.verificationToken.token !== token) {
      throw new UnauthorizedException('El código de activación ingresado es incorrecto.');
    }

    const now = new Date();
    if (now > user.verificationToken.expires_at) {
      throw new BadRequestException('El token ha expirado. Solicite uno nuevo.');
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.userAccount.update({
        where: { id: user.id },
        data: { status: UserStatus.ACTIVE },
      });

      await tx.verificationToken.delete({
        where: { id: user.verificationToken.id },
      });

      return { message: '¡Cuenta activada exitosamente! Ya puede iniciar sesión.' };
    });
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;

    const personWithAccount = await this.prisma.person.findUnique({
      where: { email },
      include: {
        userAccount: {
          include: { role: { select: { name: true } } },
        },
      },
    });

    const userAccount = personWithAccount?.userAccount;

    if (!personWithAccount || !userAccount || !userAccount.password_hash) {
      throw new UnauthorizedException('Credenciales inválidas (Correo no encontrado).');
    }

    const isPasswordValid = await bcrypt.compare(password, userAccount.password_hash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas (Contraseña incorrecta).');
    }

    const payload = {
      sub: userAccount.id,
      email: personWithAccount.email,
      role: userAccount.role.name,
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
      },
    };
  }

  async resendToken(email: string) {
    const person = await this.prisma.person.findUnique({
      where: { email },
      include: { userAccount: { include: { verificationToken: true } } },
    });

    if (!person || !person.userAccount) {
      throw new BadRequestException('El usuario no existe.');
    }

    const user = person.userAccount;

    if (user.status === UserStatus.ACTIVE) {
      throw new BadRequestException('La cuenta ya está activa.');
    }

    const newToken = this.generateToken();

    await this.prisma.verificationToken.upsert({
      where: { user_account_id: user.id },
      update: {
        token: newToken,
        expires_at: new Date(Date.now() + 60000),
      },
      create: {
        token: newToken,
        user_account_id: user.id,
        expires_at: new Date(Date.now() + 60000),
      },
    });

    await this.emailService.sendToken(email, newToken);

    return { message: 'Se ha enviado un nuevo token de activación.' };
  }
}
