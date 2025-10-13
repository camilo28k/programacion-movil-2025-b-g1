import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailModule } from 'src/shared/email/email.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // <-- CORRECCIÓN: Importa ConfigModule y ConfigService
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule, // <-- Módulo 1 (asumimos que lo quieres importar)
    EmailModule,  // <-- Módulo 2

    // CLAVE: Configurar JwtModule de forma asíncrona para leer el .env
    // ... dentro del array imports
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => ({ // <--- CORRECCIÓN CLAVE
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          // La expiración debe ser un string o number. get<string> está bien.
          expiresIn: (process.env.JWT_EXPIRATION_TIME || '3600s') as any,
        },
      }),
      inject: [ConfigService],
    }),
    // ...
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule] // Exportamos para que otros módulos lo usen
})
export class AuthModule { }
